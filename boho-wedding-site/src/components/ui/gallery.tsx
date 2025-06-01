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

const galleryPhotos: Photo[] = [
  // Engagement Photos
  { src: "/images/gallery/engagement/engagement1.jpg", alt: "Engagement Photo 1", category: "engagement" },
  { src: "/images/gallery/engagement/engagement2.jpg", alt: "Engagement Photo 2", category: "engagement" },
  { src: "/images/gallery/engagement/engagement3.jpg", alt: "Engagement Photo 3", category: "engagement" },

//   // Pre-Wedding Photos
//   { src: "/images/gallery/pre-wedding/pre-wedding1.jpg", alt: "Pre-Wedding Photo 1", category: "pre-wedding" },
//   { src: "/images/gallery/pre-wedding/pre-wedding2.jpg", alt: "Pre-Wedding Photo 2", category: "pre-wedding" },

//   // Ceremony Photos
//   { src: "/images/gallery/ceremony/ceremony1.jpg", alt: "Ceremony Photo 1", category: "ceremony" },
//   { src: "/images/gallery/ceremony/ceremony2.jpg", alt: "Ceremony Photo 2", category: "ceremony" },

//   // Reception Photos
//   { src: "/images/gallery/reception/reception1.jpg", alt: "Reception Photo 1", category: "reception" },
//   { src: "/images/gallery/reception/reception2.jpg", alt: "Reception Photo 2", category: "reception" },

  // Couple Photos
  { src: "/images/gallery/pets/couple1.jpg", alt: "Couple Photo 1", category: "couple" },
  { src: "/images/gallery/pets/couple2.jpg", alt: "Couple Photo 2", category: "couple" },
  { src: "/images/gallery/pets/couple3.jpg", alt: "Couple Photo 3", category: "couple" },
];

const categories = [
  { key: "all", label: "All Photos", labelHe: "כל התמונות" },
  { key: "engagement", label: "Engagement", labelHe: "אירוסין" },
  { key: "pre-wedding", label: "Pre-Wedding", labelHe: "לפני החתונה" },
  { key: "ceremony", label: "Ceremony", labelHe: "טקס" },
  { key: "reception", label: "Reception", labelHe: "קבלת פנים" },
  { key: "couple", label: "Couple", labelHe: "זוג" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? galleryPhotos
      : galleryPhotos.filter((photo) => photo.category === selectedCategory);

  const selectedPhoto =
    selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const goPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
      );
    }
  }, [selectedIndex, filteredPhotos.length]);

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
      );
    }
  }, [selectedIndex, filteredPhotos.length]);

  const closeDialog = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
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
          Our Gallery • <span className="font-['Amatic_SC'] font-bold">הגלריה שלנו</span>
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
              <span className="font-['Heebo'] hidden sm:inline"> {category.labelHe}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid with Scroll */}
      <div className="max-h-96 sm:max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 pr-2">
          {filteredPhotos.map((photo, index) => (
            <div
              key={`${photo.category}-${photo.src}-${index}`}
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
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* No photos message */}
      {filteredPhotos.length === 0 && (
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
        <div className="relative w-full h-full">
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