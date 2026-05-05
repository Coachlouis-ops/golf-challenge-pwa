"use client";

import { useRouter } from "next/navigation";

export default function HoneyBadgerGolfShop() {
  const router = useRouter();

  return (
    <main className="relative text-white min-h-screen overflow-hidden">
  
  {/* BACKGROUND IMAGE */}
  <img
    src="/shopbadger.png"
    className="absolute inset-0 w-full h-full object-cover opacity-40"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/70" />
  
  {/* CONTENT */}
  <div className="relative z-10">

      {/* ================= HEADER ================= */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => router.push("/")}
          className="text-xs px-3 py-1 bg-white/10 rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-sm font-semibold tracking-wide text-cyan-400">
          HONEY BADGER GOLF SHOP
        </h1>

        <div />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative w-full">
        <img
          src="/shop-hero.jpg"
          className="w-full h-[300px] object-cover opacity-70"
          alt="Shop Hero"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Fearless Gear Up 
          </h2>
          <p className="text-gray-300 text-sm max-w-xl">
            Premium golf gear. Apparel. Accessories. Built for competitors.
          </p>
        </div>
      </section>

      {/* ================= CATEGORY GRID ================= */}
      <section className="px-6 py-12 max-w-6xl mx-auto">

        <h2 className="text-xl font-semibold mb-6 text-center">
          SHOP CATEGORIES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {/* CATEGORY CARD */}
          <div
  onClick={() => router.push("/honeybadgergolfshop/hoody")}
  className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer hover:scale-105"
>
  <img src="/hoody.png" className="w-full h-32 object-cover rounded-lg mb-3" />
  <p className="text-sm text-center">Hoodies</p>
</div>

          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <img src="/shop-balls.jpg" className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-sm text-center">Balls</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <img src="/shop-apparel.jpg" className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-sm text-center">Apparel</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <img src="/shop-shoes.jpg" className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-sm text-center">Shoes</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <img src="/shop-accessories.jpg" className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-sm text-center">Accessories</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <img src="/shop-bags.jpg" className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-sm text-center">Bags</p>
          </div>

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">

        <h2 className="text-xl font-semibold mb-6 text-center">
          FEATURED PRODUCTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* PRODUCT CARD */}
          <div className="bg-white/5 p-3 rounded-xl">
            <img src="/product-1.jpg" className="w-full h-32 object-cover rounded-lg mb-2" />
            <p className="text-xs">Pro Driver</p>
            <p className="text-cyan-400 text-sm font-semibold">R3 499</p>
          </div>

          <div className="bg-white/5 p-3 rounded-xl">
            <img src="/product-2.jpg" className="w-full h-32 object-cover rounded-lg mb-2" />
            <p className="text-xs">Premium Balls</p>
            <p className="text-cyan-400 text-sm font-semibold">R799</p>
          </div>

          <div className="bg-white/5 p-3 rounded-xl">
            <img src="/product-3.jpg" className="w-full h-32 object-cover rounded-lg mb-2" />
            <p className="text-xs">Golf Shirt</p>
            <p className="text-cyan-400 text-sm font-semibold">R899</p>
          </div>

          <div className="bg-white/5 p-3 rounded-xl">
            <img src="/product-4.jpg" className="w-full h-32 object-cover rounded-lg mb-2" />
            <p className="text-xs">Golf Shoes</p>
            <p className="text-cyan-400 text-sm font-semibold">R2 199</p>
          </div>

        </div>
      </section>

         </div>
    </main>
  );
}