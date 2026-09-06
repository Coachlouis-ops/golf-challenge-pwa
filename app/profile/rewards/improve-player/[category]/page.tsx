"use client";

import { useMemo } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getImprovePlayerBoosters,
  type ImprovePlayerBoosterProduct,
} from "@/src/data/improvePlayerBoosters";

const CATEGORY_INFO: Record<
  string,
  {
    title: string;
    eyebrow: string;
    description: string;
  }
> = {
  player_protecting: {
    title: "Player Protecting Booster",
    eyebrow: "PROTECT YOUR GAME",
    description:
      "Choose one booster designed to help protect you during your round.",
  },

  player_reload: {
    title: "Player Reload Booster",
    eyebrow: "RELOAD YOUR GAME",
    description:
      "Choose your golf ball reload booster.",
  },

  player_tech: {
    title: "Player Technical Booster",
    eyebrow: "IMPROVE YOUR TECHNIQUE",
    description:
      "Choose one technical booster to help sharpen your golf game.",
  },

  player_accessory: {
    title: "Player Accessories Booster",
    eyebrow: "UPGRADE YOUR BAG",
    description:
      "Choose one golf accessory booster.",
  },

  player_image: {
    title: "Player Image Booster",
    eyebrow: "LOOK THE PART",
    description:
      "Choose one image booster for your on-course look.",
  },
};

export default function ImprovePlayerBoosterPage() {
 const router = useRouter();
const params = useParams();
const searchParams = useSearchParams();

const ballNumber = searchParams.get("ball");

  const category =
    String(params.category || "");

  const categoryInfo =
    CATEGORY_INFO[category];

  const products = useMemo(() => {
    if (!categoryInfo) {
      return [];
    }

    return getImprovePlayerBoosters(
      category as ImprovePlayerBoosterProduct["category"]
    );
  }, [category, categoryInfo]);

  if (!categoryInfo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030608] px-5 text-white">
        <div className="w-full max-w-md border border-red-400/30 bg-[#071017] p-6 text-center">
          <p className="text-sm font-black text-red-300">
            Booster category not found.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-5 border border-cyan-400/30 bg-cyan-400/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  function selectProduct(
    product: ImprovePlayerBoosterProduct
  ) {
   router.push(
  `/profile/rewards/improve-player/${category}/confirm?code=${encodeURIComponent(
    product.code
  )}&ball=${encodeURIComponent(ballNumber || "")}`
);
  }

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-cyan-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl font-black text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.15)]"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="flex flex-col items-center">

              <img
                src="/teez-app-icon-v4.png"
                alt="TEEZ Golf Challenges"
                className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(0,174,255,0.75)]"
              />

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.30em] text-cyan-400">
                Improve Player Booster
              </p>

              <h1 className="text-center text-base font-black tracking-[0.05em] text-white">
                SELECT YOUR BOOSTER
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>

        </header>


        <div className="space-y-6 px-4 pt-5">

          {/* HERO */}

          <section className="relative overflow-hidden border border-amber-400/40 bg-[#100c04] p-5 shadow-[0_0_34px_rgba(251,191,36,0.10)]">

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative">

              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-amber-400">
                {categoryInfo.eyebrow}
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {categoryInfo.title}
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {categoryInfo.description}
              </p>

              <div className="mt-4 border-t border-amber-400/20 pt-4">

                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-amber-300">
                  Select 1 of {products.length} available boosters
                </p>

              </div>

            </div>

          </section>


          {/* PRODUCTS */}

          <section>

            <div className="mb-4">

              <div className="mb-3 flex items-center gap-3">

                <div className="h-[2px] w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
                  AVAILABLE BOOSTERS
                </p>

              </div>

              <h2 className="text-xl font-black text-white">
                Choose Your Booster
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-400">
                Select the physical booster you want to receive.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-3">

              {products.map((product) => (

                <button
                  key={product.code}
                  type="button"
                  onClick={() =>
                    selectProduct(product)
                  }
                  className="group overflow-hidden border border-cyan-400/25 bg-[#071017] text-left transition active:scale-[0.98]"
                >

                  <div className="aspect-square overflow-hidden bg-white">

                    <img
                      src={product.image}
                      alt={product.productName}
                      className="h-full w-full object-contain p-2 transition duration-200 group-hover:scale-[1.03]"
                    />

                  </div>


                  <div className="border-t border-cyan-400/15 p-3">

                    <p className="text-[8px] font-black uppercase tracking-[0.12em] text-cyan-400">
                      {product.code}
                    </p>

                    <h3 className="mt-1 text-sm font-black leading-4 text-white">
                      {product.productName}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-[10px] leading-4 text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-3 border border-amber-400/30 bg-amber-400/[0.06] px-2 py-2 text-center">

                      <p className="text-[8px] font-black uppercase tracking-[0.12em] text-amber-300">
                        Select Booster
                      </p>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}