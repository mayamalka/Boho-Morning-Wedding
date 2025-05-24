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
import { ChefHat, HandPlatter, Music, PartyPopper, UtensilsCrossed } from "lucide-react";

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
            onClick={() => scrollToSection(dressCodeRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Dress Code
          </button>
          <button
            onClick={() => scrollToSection(timelineRef)}
            className="text-sky-300 hover:text-sky-500 font-['Montserrat'] text-sm md:text-base px-2 py-1"
          >
            Timeline
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

                {/* Navigation Buttons */}
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => window.open("https://waze.com/ul?q=תל-יה גן אירועים בשרון", "_blank")}
                    className="bg-sky-300 hover:bg-sky-400 text-white px-4 py-2 flex items-center gap-2"
                  >
                    <Image
                      src="/images/waze-icon.png"
                      alt="Waze"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    Waze
                  </Button>
                  <Button
                    onClick={() => window.open("https://maps.app.goo.gl/oqydMYaL4VU1c4VeA", "_blank")}
                    className="bg-sky-300 hover:bg-sky-400 text-white px-4 py-2 flex items-center gap-2"
                  >
                    <Image
                      src="/images/google-maps-icon.png"
                      alt="Google Maps"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    Google Maps
                  </Button>
                </div>
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
                <Button className="bg-sky-300 hover:bg-sky-400 text-white mx-auto flex items-center gap-2" 
                onClick={() => window.open("https://example-rsvp-site.com", "_blank")}
                >
                  <Image
                    src="/images/spotify-icon.png"
                    alt="Spotify"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span>Add a Song • <span className="font-['Heebo']">הוסף שיר</span></span>
                </Button>
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
                    <img
                      src="/wedding-rings.svg"
                      alt="Wedding Rings"
                      className="h-16 w-16 ml-auto"
                    />
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
                    <UtensilsCrossed className="h-10 w-10 text-gray-400" strokeWidth={1} />
                  </div>
                </div>

                {/* 2:00 PM - First Dance */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    {/* Black icon: Dancing couple */}
                    <img
                      src="/dancing-couple.svg"
                      alt="Dancing Couple"
                      className="h-16 w-16 ml-auto"
                    />
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center">
                    {/* Blue icon: Music note */}
                    <Music className="h-4 w-4 text-sky-400" />
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
                    {/* Black icon: platter */}
                    <HandPlatter className="h-12 w-12 text-gray-400" strokeWidth={1} />
                  </div>
                </div>
                {/* 4:00 PM - Dessert */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-10 text-right">
                    {/* Black icon: Cake */}
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
                    {/* Blue icon: Music note */}
                    <Music className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="w-1/2 pl-10">
                    {/* Black icon: Party Popper */}
                    <PartyPopper className="h-12 w-12 text-gray-400" strokeWidth={1} />
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
