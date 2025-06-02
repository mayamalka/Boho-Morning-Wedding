// File: components/Gallery.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Photo {
  src: string;
  alt: string;
  category: string;
  subfolder?: string;
}

interface Group {
  folder: string;    // For non-pets: same as category. For pets: subfolder name
  photos: Photo[];
}

export default function Gallery() {
  // ── Top‐Level Categories ──────────────────────────────────────────────────
  const categories = [
    { key: "all", label: "All Photos", labelHe: "כל התמונות" },
    { key: "engagement", label: "Engagement", labelHe: "אירוסין" },
    { key: "save-the-date", label: "Save-the-Date", labelHe: "הזמנה" },
    { key: "ceremony", label: "Ceremony", labelHe: "טקס" },
    { key: "reception", label: "Reception", labelHe: "קבלת פנים" },
    { key: "dance", label: "Dance", labelHe: "ריקודים" },
    { key: "pre-wedding", label: "Pre-Wedding", labelHe: "לפני החתונה" },
    { key: "couple", label: "Couple", labelHe: "זוג" },
    { key: "pets", label: "Pets", labelHe: 'בע"ח' },
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ── Pets Subcategories ───────────────────────────────────────────────────
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ── Modal & Navigation States ──────────────────────────────────────────────
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // ── Fetch from /api/photos when selectedCategory changes ───────────────────
  useEffect(() => {
    async function fetchGroups() {
      setLoading(true);
      try {
        const res = await fetch(`/api/photos?category=${selectedCategory}`);
        if (!res.ok) {
          console.error(
            "Failed to fetch photos for category:",
            selectedCategory
          );
          setGroups([]);
          setSubcategories([]);
          return;
        }

        const data: { subfolders?: string[]; groups: Group[] } =
          await res.json();

        if (selectedCategory === "pets") {
          const subs = data.subfolders || data.groups.map((g) => g.folder);
          setSubcategories(subs);
          setGroups(data.groups);
        } else {
          setSubcategories([]);
          setGroups(data.groups);
        }

        setSelectedSubcategory("all");
        setSelectedIndex(null);
      } catch (err) {
        console.error("Error fetching /api/photos:", err);
        setGroups([]);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGroups();
  }, [selectedCategory]);

  // ── Build a flat array of photos depending on subcategory ──────────────────
  const flatPhotos: Photo[] = useMemo(() => {
    if (groups.length === 0) return [];

    if (selectedCategory === "pets") {
      if (selectedSubcategory === "all") {
        return groups.flatMap((g) => g.photos);
      } else {
        const found = groups.find((g) => g.folder === selectedSubcategory);
        return found ? found.photos : [];
      }
    } else {
      return groups[0]?.photos || [];
    }
  }, [groups, selectedCategory, selectedSubcategory]);

  // ── Currently open photo in modal ─────────────────────────────────────────
  const selectedPhoto =
    selectedIndex !== null && selectedIndex < flatPhotos.length
      ? flatPhotos[selectedIndex]
      : null;

  // ── Navigate to previous photo ─────────────────────────────────────────────
  const goPrevious = useCallback(() => {
    if (selectedIndex !== null && flatPhotos.length > 0) {
      setSelectedIndex((prev) =>
        prev! > 0 ? prev! - 1 : flatPhotos.length - 1
      );
    }
  }, [selectedIndex, flatPhotos.length]);

  // ── Navigate to next photo ─────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (selectedIndex !== null && flatPhotos.length > 0) {
      setSelectedIndex((prev) =>
        prev! < flatPhotos.length - 1 ? prev! + 1 : 0
      );
    }
  }, [selectedIndex, flatPhotos.length]);

  // ── Close the modal ─────────────────────────────────────────────────────────
  const closeDialog = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // ── Keyboard navigation when modal is open ─────────────────────────────────
  useEffect(() => {
    if (selectedIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, goPrevious, goNext, closeDialog]);

  return (
    <Card className="p-8 mb-10 bg-white/85 border border-sky-100 shadow-lg">
      {/* ── Header & Top‐Level Categories ─────────────────────────────────────── */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-2">
          Our Gallery •{" "}
          <span className="font-['Amatic_SC'] font-bold">הגלריה שלנו</span>
        </h2>
        <p className="font-['Montserrat'] text-gray-600 mb-2">
          Browse through our precious memories in different categories
        </p>
        <p className="font-['Heebo'] text-sm font-light mb-8 text-gray-600">
          עיינו בזכרונות היקרים שלנו בקטגוריות שונות
        </p>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setSelectedCategory(category.key);
                setSelectedIndex(null);
              }}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-['Montserrat'] transition-colors ${
                selectedCategory === category.key
                  ? "bg-sky-300 text-white"
                  : "bg-sky-50 text-sky-400 hover:bg-sky-100"
              }`}
            >
              <span className="hidden sm:inline">{category.label} • </span>
              <span className="sm:hidden">{category.label}</span>
              <span className="font-['Heebo'] hidden sm:inline">
                {" "}
                {category.labelHe}
              </span>
            </button>
          ))}
        </div>

        {/* ── Pets Subcategory Buttons ───────────────────────────────────────── */}
        {selectedCategory === "pets" && subcategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8">
            {/* “All Pets” Button */}
            <button
              onClick={() => {
                setSelectedSubcategory("all");
                setSelectedIndex(null);
              }}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-['Montserrat'] transition-colors ${
                selectedSubcategory === "all"
                  ? "bg-emerald-300 text-white"
                  : "bg-emerald-50 text-emerald-400 hover:bg-emerald-100"
              }`}
            >
              <span className="hidden sm:inline">All Pets • </span>
              <span className="sm:hidden">All Pets</span>
            </button>

            {subcategories.map((sub) => {
              const label = sub.charAt(0).toUpperCase() + sub.slice(1);
              return (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubcategory(sub);
                    setSelectedIndex(null);
                  }}
                  className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-['Montserrat'] transition-colors ${
                    selectedSubcategory === sub
                      ? "bg-emerald-300 text-white"
                      : "bg-emerald-50 text-emerald-400 hover:bg-emerald-100"
                  }`}
                >
                  <span className="hidden sm:inline">{label} • </span>
                  <span className="sm:hidden">{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Loading State ─────────────────────────────────────────────────────── */}
      {loading && (
        <div className="text-center py-12">
          <p className="font-['Montserrat'] text-gray-500">Loading photos…</p>
        </div>
      )}

      {/* ── Grouped Sections (Only when Pets & All) ────────────────────────────── */}
      {!loading &&
        selectedCategory === "pets" &&
        selectedSubcategory === "all" &&
        groups.length > 0 && (
          <>
            {groups.map((group) => {
              if (group.photos.length === 0) return null;
              const headingLabel =
                group.folder.charAt(0).toUpperCase() + group.folder.slice(1);

              return (
                <div key={group.folder} className="mb-8">
                  <h3 className="text-2xl font-['Cormorant_Garamond'] text-sky-400 mb-4">
                    {headingLabel}
                  </h3>
                  <div className="max-h-96 sm:max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 pr-2">
                      {group.photos.map((photo, idx) => {
                        // Compute flat index across all groups
                        const idxOffset = groups
                          .slice(0, groups.findIndex((g) => g.folder === group.folder))
                          .reduce((sum, g) => sum + g.photos.length, 0);
                        const flatIndex = idxOffset + idx;

                        return (
                          <div
                            key={`${photo.src}-${flatIndex}`}
                            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                            onClick={() => setSelectedIndex(flatIndex)}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedIndex(flatIndex);
                              }
                            }}
                            aria-label={`Open ${photo.alt}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="
                                (max-width: 640px) 50vw,
                                (max-width: 768px) 33vw,
                                (max-width: 1024px) 25vw,
                                20vw
                              "
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

      {/* ── Flat Grid (Non‐Pets OR Single Subcategory) ─────────────────────────── */}
      {!loading &&
        ((selectedCategory !== "pets") ||
          (selectedCategory === "pets" && selectedSubcategory !== "all")) && (
          <>
            {flatPhotos.length > 0 ? (
              <div className="max-h-96 sm:max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 pr-2">
                  {flatPhotos.map((photo, index) => (
                    <div
                      key={`${photo.src}-${index}`}
                      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                      onClick={() => setSelectedIndex(index)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedIndex(index);
                        }
                      }}
                      aria-label={`Open ${photo.alt}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 768px) 33vw,
                          (max-width: 1024px) 25vw,
                          20vw
                        "
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-['Montserrat'] text-gray-500">
                  No photos in this{" "}
                  {selectedCategory === "pets"
                    ? selectedSubcategory
                    : selectedCategory}{" "}
                  yet
                </p>
                <p className="font-['Heebo'] text-sm text-gray-500 font-light">
                  אין תמונות בקטגוריה זו עדיין
                </p>
              </div>
            )}
          </>
        )}

      {/* ── Photo Modal ───────────────────────────────────────────────────────── */}
      <Dialog open={selectedPhoto !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/90 border-none">
          <div
            className="relative w-full h-full"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
            onTouchMove={(e) => setTouchEndX(e.changedTouches[0].screenX)}
            onTouchEnd={() => {
              if (touchStartX !== null && touchEndX !== null) {
                const distance = touchStartX - touchEndX;
                const threshold = 50;
                if (distance > threshold) {
                  goNext();
                } else if (distance < -threshold) {
                  goPrevious();
                }
              }
              setTouchStartX(null);
              setTouchEndX(null);
            }}
          >
            <DialogTitle>
              <VisuallyHidden>Photo preview modal</VisuallyHidden>
            </DialogTitle>

            <DialogClose className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
              <X className="h-4 w-4 text-white" />
            </DialogClose>

            {selectedPhoto && (
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                {/* Previous Button */}
                <button
                  onClick={goPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-full"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="text-white w-5 h-5" />
                </button>

                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />

                {/* Next Button */}
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-full"
                  aria-label="Next photo"
                >
                  <ChevronRight className="text-white w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}