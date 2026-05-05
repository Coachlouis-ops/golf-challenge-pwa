"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PRODUCTS = [
  { name: "Black Cap", image: "/cap_black.png" },
  { name: "Blue Cap", image: "/cap_blue.png" },
  { name: "Red Cap", image: "/cap_red.png" },
  { name: "White Cap", image: "/cap_white.png" },
  { name: "Yellow Cap", image: "/cap_yellow.png" },
];

export default function CapsPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative text-white min-h-screen overflow-hidden bg-[#050816]">

      {/* HERO IMAGE */}
      <div className="relative w-full h-[300px] md:h-[420px]">
        <img
          src="/header_cap.png"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

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

          <h1 className="text-lg font-bold text-cyan-400 tracking-widest">
            CAPS
          </h1>

          <div />
        </div>

        {/* PRODUCTS */}
        <section className="px-4 py-8 max-w-5xl mx-auto space-y-10">

          {PRODUCTS.map((item, i) => (
            <div key={i} className="flex flex-col items-center">

              <img
                src={item.image}
                onClick={() => setSelectedImage(item.image)}
                className="w-full max-w-xl object-contain cursor-pointer hover:scale-105 transition"
              />

              <p className="text-base mt-4">
                {item.name}
              </p>

              <p className="text-cyan-400 text-lg font-semibold">
                R499
              </p>

            </div>
          ))}

        </section>

      </div>

      {/* FULLSCREEN VIEW */}
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