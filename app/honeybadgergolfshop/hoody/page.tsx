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
        src="/hoody_background.png"
        className="absolute inset-0 w-full h-full object-contain opacity-100"
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

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

        {/* PRODUCTS */}
        <section className="px-4 py-6 max-w-5xl mx-auto space-y-10">

          {PRODUCTS.map((item, i) => (
            <div key={i} className="flex flex-col items-center">

              <img
                src={item.image}
                onClick={() => setSelectedImage(item.image)}
                className="w-full max-w-xl object-contain cursor-pointer"
              />

              <p className="text-base mt-4">
                {item.name}
              </p>

              <p className="text-cyan-400 text-lg font-semibold">
                R1499
              </p>

            </div>
          ))}

        </section>

      </div>

      {/* FULLSCREEN IMAGE VIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
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