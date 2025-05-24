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
    <main className="min-h-screen boho-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="boho-card p-8 backdrop-blur-sm bg-white/80">
          <div className="text-center mb-6">
            <h1 className="boho-title text-4xl mb-2">Our Wedding</h1>
            <p className="text-blue-400 italic">Please enter the secret word to view our wedding site</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter the secret word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="boho-button w-full"
            >
              Enter
            </Button>
          </form>

          <div className="mt-8 flex justify-center">
            <div className="boho-decorative-element"></div>
          </div>
        </Card>
      </div>
    </main>
  );
}
