"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function PasswordEntrance() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // The secret word to enter the wedding site
  const SECRET_WORD = "love"; // You can change this to any secret word you'd like

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toLowerCase() === SECRET_WORD.toLowerCase()) {
      router.push("/wedding");
    } else {
      setError("Incorrect password. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('/images/pastel-floral.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      />
      <div className="max-w-md w-full relative z-10">
        <Card className="p-8 bg-white/90 border border-sky-100 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl mb-2 font-['Great_Vibes'] text-sky-300">
              Our Wedding
            </h1>
            <p className="text-sky-300 italic font-['Montserrat']">
              Please enter the secret word to view our wedding site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter the secret word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-sky-200 focus:border-sky-300"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-sky-300 hover:bg-sky-400 text-white"
            >
              Enter
            </Button>
          </form>

          <div className="mt-8 flex justify-center">
            <div className="h-px w-20 bg-sky-200 relative">
              <div className="absolute w-2 h-2 rounded-full bg-sky-200 -top-[3px] -left-1"></div>
              <div className="absolute w-2 h-2 rounded-full bg-sky-200 -top-[3px] -right-1"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
