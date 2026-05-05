"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HoneyBadgerGolfShop() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <main className="relative text-white min-h-screen overflow-hidden">
  
      {/* BACKGROUND */}
      <img src="/shopbadger.png" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10">

        {/* HEADER */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <button onClick={() => router.push("/")} className="text-xs px-3 py-1 bg-white/10 rounded-lg">
            ← Back
          </button>

          <h1 className="text-sm font-semibold tracking-wide text-cyan-400">
            HONEY BADGER GOLF SHOP
          </h1>

          <div />
        </div>

        {/* CATEGORIES (LARGE IMAGES) */}
        <section className="px-6 py-10 max-w-5xl mx-auto space-y-10">

          {/* HOODIES */}
          <div onClick={() => router.push("/honeybadgergolfshop/hoody")} className="cursor-pointer">
            <img src="/hoody.png" className="w-full h-64 object-cover rounded-xl hover:scale-[1.02] transition" />
            <p className="text-center mt-3 text-lg">Hoodies</p>
          </div>

          {/* CAPS */}
          <div onClick={() => router.push("/honeybadgergolfshop/caps")} className="cursor-pointer">
            <img src="/cap_yellow.png" className="w-full h-64 object-cover rounded-xl hover:scale-[1.02] transition" />
            <p className="text-center mt-3 text-lg">Caps</p>
          </div>

          {/* PANTS */}
          <div onClick={() => router.push("/honeybadgergolfshop/pants")} className="cursor-pointer">
            <img src="/cargo_main.png" className="w-full h-64 object-cover rounded-xl hover:scale-[1.02] transition" />
            <p className="text-center mt-3 text-lg">Pants</p>
          </div>

          {/* T-SHIRTS (NEW) */}
          <div onClick={() => router.push("/honeybadgergolfshop/teeshirt")} className="cursor-pointer">
            <img src="/teeshirt_main.png" className="w-full h-64 object-cover rounded-xl hover:scale-[1.02] transition" />
            <p className="text-center mt-3 text-lg">T-Shirts</p>
          </div>

          {/* RANGEFINDER */}
          <div onClick={() => setPreview("/rangefinder.png")} className="cursor-pointer">
            <img src="/rangefinder.png" className="w-full h-64 object-cover rounded-xl hover:scale-[1.02] transition" />
            <p className="text-center mt-3 text-lg">Range Finder</p>
          </div>

        </section>

      </div>

      {/* FULLSCREEN PREVIEW */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setPreview(null)}>
          className="w-full h-auto object-contain rounded-xl hover:scale-[1.02] transition bg-black/20"
        </div>
      )}

    </main>
  );
}