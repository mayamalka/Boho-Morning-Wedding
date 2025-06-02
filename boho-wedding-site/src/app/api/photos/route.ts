// File: src/app/api/photos/route.ts

import { NextResponse } from "next/server";

type Photo = {
  src: string;
  alt: string;
  category: string;    // e.g. "pets", "engagement", etc.
  subfolder?: string;  // e.g. "freddie", "genie", "margol"
};

type Group = {
  folder: string;      // For non-pets: same as category. For pets: the subfolder name
  photos: Photo[];
};

// In‐memory cache. Keyed by category (e.g. "pets", "engagement", "all")
// Value = { data: Group[]; fetchedAt: timestamp }
const cache = new Map<string, { data: Group[]; fetchedAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

async function fetchGithubContents(
  path: string,
  token: string | undefined
): Promise<
  Array<{
    name: string;
    path: string;
    download_url: string | null;
    type: string;
  }>
> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/mayamalka/my-wedding-gallery/contents/${path}`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status} for path="${path}"`);
  }
  return res.json();
}

/**
 * Recursively fetch all images under `path` (e.g. "pets", "engagement", etc.)
 * and group them. Returns an array of Group[]:
 *  - For category !== "pets": returns exactly one Group { folder: category, photos: Photo[] }.
 *  - For category === "pets" & groupKey === null: lists immediate subfolders of "pets/",
 *      then recurses into each subfolder, returning one Group per subfolder.
 *  - For category === "pets" & groupKey !== null: recurses under "pets/<groupKey>"
 *      and returns one Group { folder: groupKey, photos: Photo[] }.
 */
async function fetchRecursivelyAndGroup(
  path: string,
  category: string,
  groupKey: string | null,
  token: string | undefined
): Promise<Group[]> {
  // 1) If category === "pets" && groupKey === null → list immediate subfolders:
  if (category === "pets" && groupKey === null) {
    const items = await fetchGithubContents("pets", token);
    const subfolders = items.filter((i) => i.type === "dir").map((i) => i.name);

    const allGroups: Group[] = [];
    for (const sub of subfolders) {
      const cacheKey = `pets/${sub}`;
      const now = Date.now();
      if (cache.has(cacheKey)) {
        const { data, fetchedAt } = cache.get(cacheKey)!;
        if (now - fetchedAt < CACHE_TTL) {
          allGroups.push(...data);
          continue;
        }
      }
      // Recurse into pets/<sub> and get one Group
      const groups = await fetchRecursivelyAndGroup(
        `pets/${sub}`,
        "pets",
        sub,
        token
      );
      cache.set(cacheKey, { data: groups, fetchedAt: now });
      allGroups.push(...groups);
    }
    return allGroups;
  }

  // 2) Otherwise: either (non-"pets") OR ("pets" & groupKey !== null).
  // We want to traverse `path` fully, collect every image under it:
  const photos: Photo[] = [];
  async function recurseFolder(currentPath: string) {
    const items = await fetchGithubContents(currentPath, token);
    for (const item of items) {
      if (
        item.type === "file" &&
        item.download_url &&
        /\.(jpe?g|png|gif|webp)$/i.test(item.name)
      ) {
        // Build alt text:
        const rawName = item.name.replace(/\.[^.]+$/, "");
        const altText = rawName.replace(/[-_]/g, " ");
        const alt = altText.charAt(0).toUpperCase() + altText.slice(1);

        photos.push({
          src: item.download_url,
          alt,
          category,
          ...(groupKey !== null ? { subfolder: groupKey } : {}),
        });
      } else if (item.type === "dir") {
        await recurseFolder(item.path);
      }
    }
  }

  await recurseFolder(path);

  // Build exactly one Group
  const folderName = groupKey !== null ? groupKey : category;
  return [
    {
      folder: folderName,
      photos,
    },
  ];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    if (!category) {
      return NextResponse.json(
        { error: "Missing `category` query parameter." },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const now = Date.now();

    // 1) Handle category === "all"
    if (category === "all") {
      // List all top-level folders in the repo root:
      const rootItems = await fetchGithubContents("", token);
      // Exclude: anything that is not a folder, or is special (like .github, node_modules)
      const topCategories = rootItems
        .filter(
          (i) =>
            i.type === "dir" &&
            !i.name.startsWith(".") &&
            i.name !== "node_modules"
        )
        .map((i) => i.name);

      const allPhotos: Photo[] = [];
      for (const cat of topCategories) {
        const cacheKey = cat;
        if (cache.has(cacheKey)) {
          const { data, fetchedAt } = cache.get(cacheKey)!;
          if (now - fetchedAt < CACHE_TTL) {
            data.forEach((g) => {
              allPhotos.push(...g.photos);
            });
            continue;
          }
        }
        const groups = await fetchRecursivelyAndGroup(cat, cat, null, token);
        cache.set(cacheKey, { data: groups, fetchedAt: now });
        groups.forEach((g) => {
          allPhotos.push(...g.photos);
        });
      }

      return NextResponse.json(
        { groups: [{ folder: "all", photos: allPhotos }] },
        {
          status: 200,
          headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate" },
        }
      );
    }

    // 2) Handle category !== "all"
    // Check in-memory cache first
    if (cache.has(category)) {
      const { data, fetchedAt } = cache.get(category)!;
      if (now - fetchedAt < CACHE_TTL) {
        if (category === "pets") {
          const subfolders = data.map((g) => g.folder);
          return NextResponse.json(
            { subfolders, groups: data },
            {
              status: 200,
              headers: {
                "Cache-Control": "s-maxage=60, stale-while-revalidate",
              },
            }
          );
        } else {
          return NextResponse.json(
            { groups: data },
            {
              status: 200,
              headers: {
                "Cache-Control": "s-maxage=60, stale-while-revalidate",
              },
            }
          );
        }
      }
    }

    // No valid cache: fetch now
    const groups = await fetchRecursivelyAndGroup(category, category, null, token);
    cache.set(category, { data: groups, fetchedAt: now });

    if (category === "pets") {
      const subfolders = groups.map((g) => g.folder);
      return NextResponse.json(
        { subfolders, groups },
        {
          status: 200,
          headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate",
          },
        }
      );
    } else {
      return NextResponse.json(
        { groups },
        {
          status: 200,
          headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate",
          },
        }
      );
    }
  } catch (error: unknown) {
    console.error("API/photos error:", error);

    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}