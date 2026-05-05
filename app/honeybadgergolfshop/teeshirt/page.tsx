"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PRODUCTS = [
  { name: "T-Shirt 1", image: "/teeshirt_1.png" },
  { name: "T-Shirt 2", image: "/teeshirt_2.png" },
  { name: "T-Shirt 3", image: "/teeshirt_3.png" },
  { name: "T-Shirt 4", image: "/teeshirt_4.png" },
  { name: "T-Shirt 5", image: "/teeshirt_5.png" },
];

export default function TeeshirtPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative text-white min-h-screen bg-[#050816]">

      {/* HEADER */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <button onClick={() => router.push("/honeybadgergolfshop")} className="text-xs px-3 py-1 bg-white/10 rounded-lg">
          ← Back
        </button>

        <h1 className="text-lg font-bold text-cyan-400 tracking-widest">
          T-SHIRTS
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

            <p className="text-base mt-4">{item.name}</p>

            <p className="text-cyan-400 text-lg font-semibold">
              R350
            </p>

          </div>
        ))}

      </section>

      {/* FULLSCREEN */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className="w-full h-full object-contain p-4" />
        </div>
      )}

    </main>
  );
}