"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import Image from "next/image";

export default function WeddingSite() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songAdded, setSongAdded] = useState(false);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the song to your Spotify playlist
    // For now, we'll just simulate success
    if (songName && artistName) {
      setSongAdded(true);
      setTimeout(() => {
        setSongAdded(false);
        setSongName("");
        setArtistName("");
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen boho-bg">
      <div className="max-w-4xl mx-auto p-4 py-12">
        {/* Save the Date Header */}
        <Card className="boho-card p-8 mb-10 text-center">
          <h1 className="boho-title text-5xl mb-4">Save the Date</h1>
          <h2 className="text-3xl font-cormorant text-blue-400 mb-2">Jane & John</h2>
          <p className="text-xl mb-6 font-montserrat">We're getting married!</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-8">
            <div>
              <h3 className="text-blue-400 text-2xl font-cormorant mb-2">When</h3>
              <p className="font-montserrat">June 15, 2026</p>
              <p className="font-montserrat">10:30 AM</p>
            </div>
            <div>
              <h3 className="text-blue-400 text-2xl font-cormorant mb-2">Where</h3>
              <p className="font-montserrat">Meadowview Gardens</p>
              <p className="font-montserrat">123 Blossom Lane</p>
              <p className="font-montserrat">Anytown, CA 12345</p>
            </div>
            <div>
              <h3 className="text-blue-400 text-2xl font-cormorant mb-2">Reception</h3>
              <p className="font-montserrat">Following the ceremony</p>
              <p className="font-montserrat">At the same location</p>
            </div>
          </div>

          <div className="boho-decorative-element mx-auto my-6"></div>
        </Card>

        {/* RSVP and Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* RSVP Link */}
          <Card className="boho-card p-8 text-center">
            <h2 className="text-3xl font-cormorant text-blue-400 mb-4">RSVP</h2>
            <p className="mb-6 font-montserrat">Please let us know if you can join us on our special day!</p>
            <Button
              className="boho-button"
              onClick={() => window.open("https://example-rsvp-site.com", "_blank")}
            >
              RSVP Now
            </Button>
          </Card>

          {/* Add Song Request */}
          <Card className="boho-card p-8 text-center">
            <h2 className="text-3xl font-cormorant text-blue-400 mb-4">Wedding Playlist</h2>
            <p className="mb-6 font-montserrat">Help us create the perfect soundtrack for our celebration!</p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="boho-button">Add a Song</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-off-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-cormorant text-blue-400">Suggest a Song</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSong} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="font-montserrat text-sm">Song Name</label>
                    <Input
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                      placeholder="Enter song name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-montserrat text-sm">Artist</label>
                    <Input
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="Enter artist name"
                      required
                    />
                  </div>
                  {songAdded && (
                    <p className="text-green-600 text-sm">Thank you! Your song has been added to our playlist.</p>
                  )}
                  <Button type="submit" className="boho-button w-full mt-4">
                    Add to Playlist
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </div>

        {/* Dress Code Section */}
        <Card className="boho-card p-8 mb-10 text-center">
          <h2 className="text-3xl font-cormorant text-blue-400 mb-4">Dress Code</h2>
          <p className="mb-4 font-montserrat">We invite you to embrace the beauty of our morning celebration with:</p>
          <div className="mb-6">
            <p className="font-montserrat font-semibold">Formal Attire in Pastel Colors</p>
            <p className="font-montserrat italic text-sm mt-2">Think soft blues, lavenders, pinks, and mint greens</p>
          </div>
          <div className="boho-decorative-element mx-auto"></div>
        </Card>

        {/* About Us Section */}
        <Card className="boho-card p-8 text-center">
          <h2 className="text-3xl font-cormorant text-blue-400 mb-4">Our Story</h2>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="boho-button">Read Our Story</Button>
            </SheetTrigger>
            <SheetContent className="bg-off-white overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-3xl font-cormorant text-blue-400">Jane & John</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6 font-montserrat">
                <p>
                  We met on a sunny morning in May, at a local café where we both happened to order the same unusual coffee blend.
                  It was the first of many coincidences that would bring us together.
                </p>
                <p>
                  After three years of adventures, laughter, and building a life together, John proposed at the same café where
                  we first met—just as the morning sun filled the room with golden light.
                </p>
                <p>
                  We chose a morning wedding to celebrate the beginning of our new day together, with the soft light and gentle
                  promise that mornings bring.
                </p>
                <p>
                  We're so grateful to have you share in our joy as we begin this new chapter of our lives together.
                </p>
                <div className="flex justify-center pt-4">
                  <SheetClose asChild>
                    <Button className="boho-button">Close</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </Card>
      </div>
    </main>
  );
}
