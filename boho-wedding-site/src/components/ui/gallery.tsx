"use client";

import { useState, useEffect, useCallback } from "react";
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
}

const categories = [
  { key: "all", label: "All Photos", labelHe: "כל התמונות" },
  { key: "engagement", label: "Engagement", labelHe: "אירוסין" },
  { key: "save-the-date", label: "save-the-date" },
  { key: "ceremony", label: "Ceremony", labelHe: "טקס" },
  { key: "reception", label: "Reception", labelHe: "קבלת פנים" },
  { key: "dance", label: "dance", labelHe: "ריקודים" },
  { key: "pre-wedding", label: "Pre-Wedding", labelHe: "לפני החתונה" },
  { key: "couple", label: "Couple", labelHe: "זוג" },
  { key: "pets", label: "pets", labelHe: "החיות שלנו" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch positions for swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  /**
   * Helper: Given a GitHub folder name (category),
   * fetches all files in that folder via GitHub API, filters to images,
   * and returns an array of Photo objects.
   */
  async function fetchPhotosForCategory(catKey: string): Promise<Photo[]> {
    // GitHub Contents API endpoint for a folder
    const url = `https://api.github.com/repos/mayamalka/my-wedding-gallery/contents/${catKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch folder "${catKey}" → ${res.status}`);
        return [];
      }
      const items: Array<{
        name: string;
        path: string;
        download_url: string | null;
        type: string;
      }> = await res.json();

      // Filter only files with download_url (i.e. skip subfolders or non-files)
      // and only common image extensions
      return items
        .filter(
          (item) =>
            item.type === "file" &&
            item.download_url &&
            /\.(jpe?g|png|gif|webp)$/i.test(item.name)
        )
        .map((item) => {
          // Derive a human-friendly alt from the filename, e.g. "engagement1.jpg" → "Engagement1"
          const rawName = item.name.replace(/\.[^.]+$/, ""); // remove extension
          const altText = rawName.replace(/[-_]/g, " "); // replace dashes/underscores
          const alt =
            altText.charAt(0).toUpperCase() + altText.slice(1); // capitalize first letter

          return {
            src: item.download_url!,
            alt,
            category: catKey,
          };
        });
    } catch (err) {
      console.error("Error fetching GitHub folder:", err);
      return [];
    }
  }

  /**
   * Whenever selectedCategory changes, load photos.
   * - If "all": fetch each category folder (excluding "all") in parallel.
   * - Otherwise: fetch just that one folder.
   */
  useEffect(() => {
    async function loadPhotos() {
      if (selectedCategory === "all") {
        // Fetch each real category in parallel (excluding "all")
        const realCats = categories
          .map((c) => c.key)
          .filter((key) => key !== "all");

        // Kick off all fetches simultaneously
        const arraysOfPhotos = await Promise.all(
          realCats.map((catKey) => fetchPhotosForCategory(catKey))
        );
        // Flatten into one big array
        const combined = arraysOfPhotos.flat();
        setPhotos(combined);
      } else {
        // Just fetch the single chosen category folder
        const arr = await fetchPhotosForCategory(selectedCategory);
        setPhotos(arr);
      }
      setSelectedIndex(null);
    }

    loadPhotos();
  }, [selectedCategory]);

  // The currently open photo in the modal
  const selectedPhoto =
    selectedIndex !== null && selectedIndex < photos.length
      ? photos[selectedIndex]
      : null;

  // Navigate to previous photo in the filtered list
  const goPrevious = useCallback(() => {
    if (selectedIndex !== null && photos.length > 0) {
      setSelectedIndex((prev) =>
        prev! > 0 ? prev! - 1 : photos.length - 1
      );
    }
  }, [selectedIndex, photos.length]);

  // Navigate to next photo in the filtered list
  const goNext = useCallback(() => {
    if (selectedIndex !== null && photos.length > 0) {
      setSelectedIndex((prev) =>
        prev! < photos.length - 1 ? prev! + 1 : 0
      );
    }
  }, [selectedIndex, photos.length]);

  // Close the modal
  const closeDialog = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation inside the modal
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
      </div>

      {/* Photo Grid with Scroll */}
      <div className="max-h-96 sm:max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 pr-2">
          {photos.map((photo, index) => (
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

      {/* No photos message */}
      {photos.length === 0 && (
        <div className="text-center py-12">
          <p className="font-['Montserrat'] text-gray-500">
            No photos in this category yet
          </p>
          <p className="font-['Heebo'] text-sm text-gray-500 font-light">
            אין תמונות בקטגוריה זו עדיין
          </p>
        </div>
      )}

      {/* Photo Modal */}
      <Dialog open={selectedPhoto !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/90 border-none">
          <div
            className="relative w-full h-full"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
            onTouchMove={(e) => setTouchEndX(e.changedTouches[0].screenX)}
            onTouchEnd={() => {
              if (touchStartX !== null && touchEndX !== null) {
                const distance = touchStartX - touchEndX;
                const threshold = 50; // minimum swipe distance
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