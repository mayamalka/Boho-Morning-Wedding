"use client";

import { useState, useRef } from "react";
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
import Image from "next/image";
import { ChefHat, UtensilsCrossed } from "lucide-react";

export default function WeddingSite() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songAdded, setSongAdded] = useState(false);

  // References for section navigation
  const saveTheDateRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const dressCodeRef = useRef<HTMLDivElement>(null);
  const ourStoryRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = -100; // Offset to position the section below the navbar
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url('/images/pastel-floral.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1,
        }}
      />

      {/* Navigation Menu */}
      <div className="sticky top-0 z-50 bg-white/85 shadow-sm border-b border-sky-100 py-3">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-2 md:gap-8">
          <button
            onClick={() => scrollToSection(saveTheDateRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Save the Date
          </button>
          <button
            onClick={() => scrollToSection(rsvpRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            RSVP
          </button>
          <button
            onClick={() => scrollToSection(playlistRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Playlist
          </button>
          <button
            onClick={() => scrollToSection(timelineRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Timeline
          </button>
          <button
            onClick={() => scrollToSection(dressCodeRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Dress Code
          </button>
          <button
            onClick={() => scrollToSection(photosRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Photos
          </button>
          <button
            onClick={() => scrollToSection(ourStoryRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Our Story
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-20 pt-10 relative z-10">
        {/* Save the Date Header */}
        <div ref={saveTheDateRef} className="pt-16 -mt-16" id="save-the-date">
          <Card className="p-8 mb-10 text-center bg-white/85 border border-sky-100 shadow-lg">
            <h1 className="text-5xl mb-4 font-['Great_Vibes'] text-sky-300">Save the Date</h1>
            <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-2">Maya & Ilay</h2>
            <h3 className="text-2xl mb-2 font-['Amatic_SC'] text-gray-700 font-bold">מאיה ועילי</h3>
            <p className="text-lg mb-6 font-['Heebo'] text-gray-600 font-light">
              שמחים להזמין אתכם לחגוג עימנו את יום נישואינו
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center my-8">
              <div>
                <h3 className="text-sky-400 text-2xl font-['Cormorant_Garamond'] mb-2">When • <span className="font-['Amatic_SC'] font-bold">מתי</span></h3>
                <p className="font-['Montserrat'] text-xl mb-1">March 27, 2026 • 27.3.2026</p>
                <p className="font-['Heebo'] text-lg font-light">יום שישי, כ״ו באדר ב׳ תשפ״ו</p>
                <p className="font-['Montserrat'] mt-2">11:00 AM</p>
              </div>
              <div>
                <h3 className="text-sky-400 text-2xl font-['Cormorant_Garamond'] mb-2">Where • <span className="font-['Amatic_SC'] font-bold">איפה</span></h3>
                <p className="font-['Montserrat'] text-xl">Tel Ya • <span className="font-['Heebo'] font-light">תל יה</span></p>
              </div>
            </div>

            {/* Parents Section */}
            <div className="mt-10 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
                <div>
                  <h4 className="text-sky-400 text-xl font-['Cormorant_Garamond'] mb-2">Parents of the Bride • <span className="font-['Amatic_SC'] font-bold">הורי הכלה</span></h4>
                  <p className="font-['Montserrat']">Keren Lee & Yoram</p>
                  <p className="font-['Heebo'] text-sm font-light">קרן לי ויורם</p>
                </div>
                <div>
                  <h4 className="text-sky-400 text-xl font-['Cormorant_Garamond'] mb-2">Parents of the Groom • <span className="font-['Amatic_SC'] font-bold">הורי החתן</span></h4>
                  <p className="font-['Montserrat']">Galit & Guy</p>
                  <p className="font-['Heebo'] text-sm font-light">גלית וגיא</p>
                </div>
              </div>
            </div>

            <div className="h-px w-32 bg-sky-200 relative mx-auto my-6">
              <div className="absolute w-2 h-2 rounded-full bg-sky-200 -top-[3px] -left-1"></div>
              <div className="absolute w-2 h-2 rounded-full bg-sky-200 -top-[3px] -right-1"></div>
            </div>
          </Card>
        </div>

        {/* RSVP and Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* RSVP Link */}
          <div ref={rsvpRef} className="pt-16 -mt-16" id="rsvp">
            <Card className="p-8 text-center bg-white/85 border border-sky-100 shadow-lg h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-4">RSVP</h2>
                <p className="mb-2 font-['Montserrat']">Please let us know if you can join us on our special day!</p>
                <p className="mb-6 font-['Heebo'] text-sm font-light">אנא הודיעו לנו אם תוכלו להצטרף אלינו ביום המיוחד שלנו</p>
              </div>
              <Button
                className="bg-sky-300 hover:bg-sky-400 text-white mx-auto"
                onClick={() => window.open("https://example-rsvp-site.com", "_blank")}
              >
                RSVP Now • <span className="font-['Heebo']">אישור הגעה</span>
              </Button>
            </Card>
          </div>

          {/* Add Song Request */}
          <div ref={playlistRef} className="pt-16 -mt-16" id="playlist">
            <Card className="p-8 text-center bg-white/85 border border-sky-100 shadow-lg h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-4">Wedding Playlist</h2>
                <p className="mb-2 font-['Montserrat']">Help us create the perfect soundtrack for our celebration!</p>
                <p className="mb-6 font-['Heebo'] text-sm font-light">עזרו לנו ליצור את הפלייליסט המושלם לחגיגה שלנו</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-sky-300 hover:bg-sky-400 text-white mx-auto flex items-center gap-2">
                    <Image
                      src="/images/spotify-icon.png"
                      alt="Spotify"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span>Add a Song • <span className="font-['Heebo']">הוסף שיר</span></span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/95">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-['Cormorant_Garamond'] text-sky-400">Suggest a Song • <span className="font-['Amatic_SC'] font-bold">הצע שיר</span></DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddSong} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="font-['Montserrat'] text-sm">Song Name • <span className="font-['Heebo']">שם השיר</span></label>
                      <Input
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        placeholder="Enter song name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-['Heebo'] text-sm">Artist • אמן</label>
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
                    <Button type="submit" className="w-full bg-sky-300 hover:bg-sky-400 text-white mt-4 flex items-center justify-center gap-2">
                      <Image
                        src="/images/spotify-icon.png"
                        alt="Spotify"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <span>Add to Playlist • <span className="font-['Heebo']">הוסף לפלייליסט</span></span>
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        </div>

        {/* Dress Code Section - Fixed for mobile */}
        <div ref={dressCodeRef} className="pt-16 -mt-16" id="dress-code">
          <Card className="p-8 mb-10 bg-white/85 border border-sky-100 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-2">Dress Code • <span className="font-['Amatic_SC'] font-bold">קוד לבוש</span></h2>
              <h3 className="text-2xl font-['Great_Vibes'] text-gray-700 mb-1">What to Wear</h3>
              <p className="font-['Heebo'] text-sm font-light mb-8">לבוש חגיגי בצבעי פסטל</p>
            </div>

            {/* Single line of circles that are smaller on mobile */}
            <div className="flex justify-center mb-10">
              <div className="flex space-x-2 sm:space-x-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#e0f2fe'}}></div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#fce7f3'}}></div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#ddd6fe'}}></div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#d1fae5'}}></div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#fef3c7'}}></div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-300" style={{backgroundColor: '#f5f0e0'}}></div>
              </div>
            </div>

            <p className="text-center mt-4 font-['Montserrat'] text-sm text-gray-600 italic">
              This is a morning wedding, so light colors are perfect for the occasion!
            </p>
            <p className="text-center mt-1 font-['Heebo'] text-sm text-gray-600 font-light">
              זוהי חתונת בוקר, כך שצבעים בהירים מושלמים לאירוע!
            </p>
          </Card>
        </div>

        {/* Wedding Timeline Section */}
        <div ref={timelineRef} className="pt-16 -mt-16" id="timeline">
          <Card className="p-8 mb-10 bg-white/85 border border-sky-100 shadow-lg">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-['Cormorant_Garamond'] text-gray-700 mb-2">WEDDING TIMELINE</h2>
            </div>

            <div className="relative max-w-2xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-200 -ml-px"></div>

              {/* Timeline items */}
              <div className="space-y-16 relative z-10">
                {/* 11:00 AM - Reception */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    <p className="font-['Montserrat'] font-medium text-lg">11:00 AM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">Reception</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">קבלת פנים</p>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-1/2 pl-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>

                {/* 1:00 PM - Wedding Ceremony */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    {/* Black icon: Rings */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="6" strokeWidth={1} />
                      <circle cx="8" cy="12" r="6" strokeWidth={1} />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Heart */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="w-1/2 pl-10">
                    <p className="font-['Montserrat'] font-medium text-lg">1:00 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">Wedding Ceremony</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">טקס החופה</p>
                  </div>
                </div>

                {/* 1:45 PM - Entrée Dish */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    <p className="font-['Montserrat'] font-medium text-lg">1:45 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">Entrée Dish</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">מנה ראשונה</p>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Chef hat */}
                    <ChefHat className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="w-1/2 pl-10">
                    {/* Black icon: Fork/knife */}
                    <UtensilsCrossed className="h-10 w-10 text-gray-400 ml-auto" strokeWidth={1} />
                  </div>
                </div>

                {/* 2:00 PM - First Dance */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    {/* Black icon: Dancing couple */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 ml-auto" viewBox="0 0 360 360" fill="currentColor">
                      <path d="M1801 3368 c-25 -13 -58 -40 -75 -61 -25 -31 -31 -49 -34 -103 -4
-57 -1 -72 27 -129 42 -84 233 -285 271 -285 34 0 234 204 274 279 50 93 38
189 -33 264 -56 61 -129 74 -202 36 -39 -19 -42 -20 -76 -4 -59 28 -103 29
-152 3z m349 -73 c36 -18 65 -91 56 -137 -10 -48 -57 -115 -141 -198 l-76 -75
-84 87 c-137 143 -167 236 -95 301 42 37 88 37 133 -3 42 -36 46 -37 83 -4 51
45 80 52 124 29z"/>
                      <path d="M2445 3105 c-81 -29 -144 -135 -129 -217 8 -43 48 -123 80 -162 15
-17 64 -70 111 -118 65 -68 90 -88 111 -88 21 0 51 24 139 113 139 143 167
191 161 288 -3 56 -9 76 -33 110 -42 59 -76 81 -132 86 -37 3 -59 -1 -94 -19
-44 -22 -46 -23 -75 -6 -43 25 -94 30 -139 13z m352 -98 c45 -41 51 -111 16
-181 -19 -36 -182 -206 -197 -205 -6 1 -46 39 -90 87 -129 140 -156 232 -86
295 40 36 77 35 125 -3 46 -36 55 -37 93 -5 58 48 96 52 139 12z"/>
                      <path d="M1213 2890 c-70 -28 -146 -98 -179 -165 -47 -98 -42 -252 12 -314 83
-95 96 -112 93 -114 -26 -16 -113 -33 -145 -30 -55 6 -123 -24 -156 -68 -25
-35 -142 -294 -172 -382 -21 -62 -21 -159 0 -203 34 -72 157 -109 233 -70 l31
17 0 -108 c0 -60 -12 -207 -27 -328 l-26 -220 -110 -245 c-120 -268 -127 -300
-89 -363 38 -60 67 -67 264 -67 95 0 178 4 184 8 19 12 44 70 50 115 5 37 2
47 -22 76 -15 18 -45 41 -65 50 l-37 16 67 115 c37 63 89 170 116 237 27 68
50 121 52 119 2 -1 14 -40 27 -85 l24 -83 -28 -56 c-54 -111 -82 -219 -95
-372 -11 -127 -89 -114 719 -119 383 -2 706 -1 720 3 13 3 26 12 29 20 8 20
-29 175 -74 311 -98 296 -245 516 -444 662 l-30 22 24 17 c36 26 61 90 61 159
0 79 -26 135 -76 165 -22 13 -40 24 -42 26 -2 1 4 30 13 65 29 109 15 194 -53
321 -1 3 11 9 27 13 17 4 33 11 36 16 15 24 22 1 28 -90 3 -54 17 -154 31
-222 28 -137 102 -379 120 -392 6 -4 41 -6 78 -4 91 6 161 41 232 118 56 60
136 205 136 246 0 12 -15 31 -37 46 -108 75 -197 198 -239 332 -31 98 -36 247
-10 307 32 75 13 160 -51 220 -53 50 -136 63 -213 32 -37 -15 -43 -15 -82 1
-26 10 -70 17 -111 17 -57 0 -80 -6 -133 -32 -65 -32 -130 -95 -140 -137 -3
-12 1 -32 9 -43 14 -20 14 -26 -1 -58 -23 -56 -20 -157 7 -214 13 -26 29 -52
37 -59 19 -16 18 -29 -5 -29 -10 0 -45 -13 -77 -30 -32 -16 -60 -30 -61 -30
-2 0 -3 28 -3 62 0 86 -22 117 -130 179 -12 7 -7 16 27 51 78 79 107 185 78
283 -16 57 -16 58 6 81 19 21 20 26 9 54 -18 45 -82 106 -142 136 -73 38 -199
44 -275 14z m208 -75 c48 -17 128 -79 117 -91 -4 -4 -72 -11 -150 -16 -79 -5
-158 -12 -176 -14 -43 -6 -94 -59 -112 -115 -13 -40 -15 -42 -18 -16 -6 47 26
135 65 178 73 81 174 108 274 74z m108 -216 c59 -168 -114 -332 -277 -263 -38
15 -87 56 -102 85 -11 20 32 146 60 173 18 18 37 22 138 27 64 3 129 6 144 7
21 2 28 -4 37 -29z m555 -31 c54 -16 128 -90 144 -144 23 -79 12 -159 -23
-168 -37 -9 -54 3 -66 48 -6 22 -18 49 -27 60 -24 26 -74 46 -119 46 -57 0
-111 18 -145 49 l-31 27 40 34 c68 57 142 73 227 48z m277 -24 c15 -15 31 -39
34 -54 7 -33 -14 -87 -43 -114 -24 -21 -26 -18 -36 45 -4 20 -21 61 -40 92
-19 31 -31 59 -27 62 14 15 84 -4 112 -31z m-399 -217 l83 -13 17 -54 c10 -31
30 -65 45 -79 l27 -23 -24 -18 c-24 -18 -85 -40 -111 -40 -64 0 -151 58 -175
117 -14 33 -19 109 -8 137 5 14 9 14 35 1 15 -8 66 -21 111 -28z m402 -123
c16 -170 85 -316 211 -440 l82 -82 -35 -66 c-47 -89 -125 -161 -199 -182 -30
-9 -59 -12 -64 -7 -13 13 -76 242 -100 365 -15 76 -22 155 -23 241 l-1 128 32
27 c18 15 35 39 38 54 6 23 16 31 46 37 3 0 9 -33 13 -75z m-995 15 c79 -12
157 -45 176 -73 10 -13 15 -46 15 -94 l0 -74 -47 7 c-69 10 -177 49 -239 86
-55 34 -152 124 -143 134 7 6 104 22 144 24 17 0 59 -4 94 -10z m-316 -69 c16
-18 27 -42 27 -58 0 -28 -34 -112 -45 -112 -13 0 -165 85 -165 93 0 26 34 80
62 97 43 27 84 20 121 -20z m176 -148 c124 -81 293 -118 497 -109 107 5 135 3
153 -9 27 -20 28 -65 0 -90 -19 -17 -38 -19 -213 -19 -154 0 -205 4 -261 19
-78 20 -238 92 -271 122 l-22 19 24 53 c13 28 26 52 28 52 3 0 32 -17 65 -38z
m704 4 c36 -15 83 -65 98 -105 16 -40 12 -157 -7 -214 -11 -34 -29 -62 -51
-80 -18 -16 -40 -42 -48 -57 -17 -33 -21 -164 -6 -203 15 -38 79 -98 160 -147
194 -118 358 -354 454 -650 37 -113 61 -209 56 -214 -2 -2 -293 -1 -646 2
l-643 5 0 36 c0 81 40 226 88 326 48 99 107 179 250 345 85 99 147 215 157
293 10 78 -15 127 -96 197 -36 30 -75 67 -87 81 -45 55 -45 55 107 62 149 7
191 18 228 58 61 68 41 184 -39 225 -30 16 -148 22 -169 9 -5 -4 -9 -1 -9 4 0
6 3 11 8 11 4 1 30 7 57 15 65 18 98 18 138 1z m-950 -98 c18 -13 17 -18 -16
-98 -19 -47 -40 -102 -47 -123 -24 -75 -109 -100 -161 -48 -46 47 -37 113 40
284 l30 68 68 -35 c37 -19 76 -41 86 -48z m127 -78 c54 -39 176 -90 269 -114
l93 -23 29 -54 c16 -29 36 -60 44 -69 11 -12 15 -41 15 -108 l0 -92 -275 0
-275 0 0 162 c0 159 1 163 32 240 18 43 34 78 36 78 2 0 17 -9 32 -20z m1000
-300 c16 -16 20 -33 20 -85 0 -52 -4 -69 -20 -85 -26 -26 -68 -25 -97 2 -33
31 -33 131 -1 165 27 29 71 30 98 3z m-422 -100 c12 -18 22 -48 22 -66 0 -34
-38 -144 -50 -144 -8 0 -20 124 -20 202 0 58 13 60 48 8z m-115 -238 l7 -83
-68 -77 c-37 -42 -77 -90 -89 -107 -12 -16 -23 -28 -25 -25 -2 3 -17 50 -32
105 -37 134 -56 161 -93 137 -7 -4 -48 -96 -92 -203 -48 -118 -109 -246 -156
-326 -49 -84 -75 -141 -73 -155 2 -18 15 -27 62 -43 66 -23 82 -40 72 -79 l-7
-27 -155 3 c-140 3 -157 5 -170 22 -8 11 -14 28 -14 37 0 10 49 128 108 262
l109 243 22 179 c12 99 24 190 27 203 l4 22 278 -2 277 -3 8 -83z"/>
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Keep as is */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="w-1/2 pl-10">
                    <p className="font-['Montserrat'] font-medium text-lg">2:00 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">First Dance</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">ריקוד ראשון</p>
                  </div>
                </div>

                {/* 2:30 PM - Main Dish */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    <p className="font-['Montserrat'] font-medium text-lg">2:30 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">Main Dish</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">מנה עיקרית</p>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Chef hat */}
                    <ChefHat className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="w-1/2 pl-10">
                    {/* Black icon: Chicken */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 260 280" fill="currentColor">
                      <path d="M173 232.2c-1.6-1.6-3.2-4.5-3.5-6.4-.5-2.4-2.2-5.1-5.3-8.1-4-4-6-5-13.7-7.2-20.1-5.8-34.1-12.3-40.8-19-3.5-3.5-5.6-4.6-12.1-6.4-21.4-5.9-41.1-19.7-50.9-35.8-3.2-5.2-4.3-6.2-8-7.3-2.4-.6-6.6-2.8-9.3-4.9-13.1-9.9-15.3-29.1-4.9-42.7l2.3-3.1-4.7-2c-7.5-3.1-10.3-11.2-6.1-18 4-6.7-2.1-6.3 104.5-6.3 106.6 0 100.5-.4 104.5 6.3 4.3 6.9 1.3 15-6.7 18.2l-4.9 2 1.7 4c5.6 12.4 6.2 28.1 1.5 41.6l-2.6 7.6 2 5.9c1.2 3.2 3 9.5 4.1 13.9 1.8 7.3 2.6 8.5 7.7 13.8 4.5 4.5 6.3 5.7 8.8 5.7 4.4 0 9.7 3.9 11.1 8.1 1.9 5.9.7 8.8-6.6 15.4-.6.6-2.4 2.4-3.9 4.2-7 7.8-20.2 3-20.2-7.4 0-2.2-1.5-4.3-6.2-9-6-5.9-6.7-6.2-16.2-8.8-5.5-1.5-12.3-3.5-15.1-4.6-4.8-1.8-8.5-1.8-8.5 0 0 .5.9 4.3 2 8.7 1.8 6.8 2.7 8.5 6.7 12.6 3.5 3.5 5.5 4.8 7.6 4.8 1.5 0 3.7.5 4.8 1 2.2 1.3 4.9 6.1 4.9 9 0 3.2-2.5 7.4-5.4 8.9-1.4.8-2.8 2.3-3.2 3.3-.7 2.4-5.5 4.8-9.4 4.8-2.1 0-4.1-.9-6-2.8zm9.8-7.9c.3-2.9.7-3.3 3.2-3.3 2 0 3.1-.6 3.5-2 .9-3-0.4-4.3-3.9-3.7-2.7.4-3.8-.2-8.2-4.5l-5.2-5-2.6 2.3-2.6 2.3 5.4 5.5c4.1 4.1 5.3 6 4.6 7-1.3 2.2.7 5.3 3.3 4.9 1.7-.2 2.3-1.1 2.5-3.5zm48.3-16.3c1.2-.7 1.9-2.1 1.9-4 0-2.4.4-3 2.1-3 3.6 0 5.9-1.9 5.9-4.9 0-3.8-2.1-5.4-6.1-4.6-2.8.6-3.6.2-8.8-4.8l-5.6-5.6-3.6 3.4-3.7 3.3 5.9 5.8c5.3 5.2 5.8 6.2 5.3 9-.4 2.1-.1 3.6 1.1 4.7 1.9 2 2.9 2.1 5.6.7zm-66.4-5.2c1.3-1.2 2.3-3.3 2.3-4.7 0-2.4-2.5-12.9-3.2-13.6-.2-.2-3.7.6-7.8 1.7-5.1 1.4-12.4 2.2-23 2.7l-15.5.6 7.4 3.8c9 4.7 29.3 11.7 34 11.7 2.2 0 4.3-.8 5.8-2.2zm-19.2-21.8c7.6-1.2 18.5-4.1 18.4-4.9 0-.3-2.6-1.8-5.8-3.3-15.6-7.4-24-21-22.9-37 1-13.5 10.2-26.1 22.8-31 7.7-3 19.4-3 27.3.1 8 3.1 15.1 10.4 20.7 21.1l4.4 8.5 1.2-5c2.5-10.6 1-23.5-4.1-33.5l-2.6-5-82.8.2-82.9.3-4.4 3c-6.2 4.4-9.8 11.3-9.8 19 0 11 8.1 20.9 18 22.2 3.4.5 4.6 1.2 5.9 3.5 12 21.9 32 35.7 59.7 41.2 8.2 1.7 28.4 2 36.9.6zm66.7-1.9l3.2-2.9-1.3-6.3c-3.4-16.7-14.6-43.8-21-51.1-8.1-9.2-23-12-34.3-6.5-17.6 8.6-22.2 31.1-9.4 45.4 6.4 7.1 19.7 13.7 41.1 20.3 16.1 4.9 17.3 5 21.7 1.1zm4.1-96.2c4.1-2.2 4.9-5.9 2-9.1-1.5-1.7-5.9-1.8-97.6-1.8-88 0-96.2.1-97.9 1.7-3 2.7-2.3 6.9 1.7 9.1 2.9 1.6 188.7 1.7 191.8.1z"/>
                    </svg>
                  </div>
                </div>

                {/* 4:00 PM - Dessert */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    {/* Black icon: Cake (keep as is) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Chef hat */}
                    <ChefHat className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="w-1/2 pl-10">
                    <p className="font-['Montserrat'] font-medium text-lg">4:00 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">Dessert</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">קינוח</p>
                  </div>
                </div>

                {/* 4:30 PM - After Party */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    <p className="font-['Montserrat'] font-medium text-lg">4:30 PM</p>
                    <p className="font-['Great_Vibes'] text-xl tracking-wider text-gray-600">After Party</p>
                    <p className="font-['Heebo'] text-sm font-light mt-1 text-gray-500">אפטר פארטי</p>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: DJ levels */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="w-1/2 pl-10">
                    {/* Black icon: Music notes */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <g>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13" />
                        <circle cx="6" cy="19" r="2" strokeWidth={1} />
                        <circle cx="18" cy="16" r="2" strokeWidth={1} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 3l-12 3" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Names at bottom */}
                <div className="text-center pt-6">
                  <p className="font-['Great_Vibes'] text-3xl text-sky-400">Maya & Ilay</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Photo App Section */}
        <div ref={photosRef} className="pt-16 -mt-16" id="photos">
          <Card className="p-8 mb-10 bg-white/85 border border-sky-100 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-2">Capture Our Special Day • <span className="font-['Amatic_SC'] font-bold">תעדו את היום המיוחד שלנו</span></h2>
              <p className="font-['Montserrat'] text-gray-600 mb-2">
                Help us collect memories by taking photos at our wedding with our app!
              </p>
              <p className="font-['Heebo'] text-sm font-light mb-8 text-gray-600">
                עזרו לנו לאסוף זכרונות על ידי צילום תמונות בחתונה שלנו עם האפליקציה שלנו!
              </p>

              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center p-4 bg-sky-50 rounded-lg w-full max-w-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-['Montserrat'] font-medium">Download our wedding photo app</p>
                    <p className="font-['Heebo'] text-sm text-gray-500">הורידו את אפליקציית התמונות של החתונה שלנו</p>
                  </div>
                </div>

                <Button
                  className="bg-sky-300 hover:bg-sky-400 text-white px-8 py-4 rounded-full shadow-md"
                  onClick={() => window.open("https://example-photo-app.com", "_blank")}
                >
                  Get the App • <span className="font-['Heebo']">קבל את האפליקציה</span>
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 font-['Montserrat'] italic">
                    All photos will be shared with the couple and may be included in our wedding album
                  </p>
                  <p className="text-sm text-gray-500 font-['Heebo'] font-light">
                    כל התמונות ישותפו עם הזוג ויתכן שיכללו באלבום החתונה שלנו
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* About Us Section */}
        <div ref={ourStoryRef} className="pt-16 -mt-16" id="our-story">
          <Card className="p-8 text-center bg-white/85 border border-sky-100 shadow-lg">
            <h2 className="text-3xl font-['Cormorant_Garamond'] text-sky-400 mb-4">Our Story • <span className="font-['Amatic_SC'] font-bold">הסיפור שלנו</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
              <div>
                {/* Placeholder for couple photo */}
                <div className="w-full h-64 bg-sky-100 flex items-center justify-center rounded-md overflow-hidden">
                  <p className="text-sky-400 font-['Montserrat'] italic">Add a photo of the couple here</p>
                </div>
              </div>
              <div className="text-right space-y-6 rtl">
                <p className="font-['Heebo'] text-lg font-light">
                  נפגשנו בבוקר שטוף שמש בחודש מאי, בבית קפה מקומי שבו במקרה הזמנו את אותה תערובת קפה לא שגרתית.
                  זה היה הראשון מבין צירופי מקרים רבים שיקרבו בינינו.
                </p>

                <p className="font-['Heebo'] text-lg font-light">
                  לאחר שלוש שנים של הרפתקאות, צחוק ובניית חיים משותפים, עילי הציע באותו בית קפה שבו
                  נפגשנו לראשונה - בדיוק כאשר שמש הבוקר מילאה את החדר באור זהוב.
                </p>

                <p className="font-['Heebo'] text-lg font-light">
                  בחרנו בחתונת בוקר כדי לחגוג את תחילת היום החדש שלנו יחד, עם האור הרך וההבטחה העדינה שמביאים הבקרים.
                </p>

                <p className="font-['Heebo'] text-lg font-light">
                  אנחנו אסירי תודה שאתם חולקים איתנו את השמחה שלנו בעת שאנו מתחילים פרק חדש זה בחיינו המשותפים.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
