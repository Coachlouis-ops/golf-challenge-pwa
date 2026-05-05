"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PRODUCTS = [
  { name: "Red Hoodie", image: "/hoody.png" },
  { name: "Blue Hoodie", image: "/hoody_blue.png" },
  { name: "White Hoodie", image: "/hoody_white.png" },
  { name: "Black Hoodie", image: "/hoody_black.png" },
  { name: "Pink Hoodie", image: "/hoody_pink.png" },
];

export default function HoodiePage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative text-white min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <img
        src="/hoodybackground.png"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
          <button
            onClick={() => router.push("/honeybadgergolfshop")}
            className="text-xs px-3 py-1 bg-white/10 rounded-lg"
          >
            ← Back
          </button>

          <h1 className="text-sm font-semibold text-cyan-400">
            HOODIES
          </h1>

          <div />
        </div>

        {/* PRODUCTS GRID */}
        <section className="px-4 py-6 max-w-6xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {PRODUCTS.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10"
              >
                <img
                  src={item.image}
                  onClick={() => setSelectedImage(item.image)}
                  className="w-full h-64 md:h-80 object-contain mb-3 cursor-pointer"
                />

                <p className="text-sm text-center mb-1">
                  {item.name}
                </p>

                <p className="text-cyan-400 text-base font-semibold text-center">
                  R1499
                </p>
              </div>
            ))}

          </div>
        </section>

      </div>

      {/* FULLSCREEN IMAGE VIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="w-full h-full object-contain p-4"
          />
        </div>
      )}

    </main>
  );
}