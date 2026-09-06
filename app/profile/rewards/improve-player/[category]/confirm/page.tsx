"use client";

import { useMemo } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  IMPROVE_PLAYER_BOOSTERS,
  type ImprovePlayerBoosterProduct,
} from "@/src/data/improvePlayerBoosters";

export default function ConfirmBoosterPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const category =
    String(params.category || "");

  const code =
    String(searchParams.get("code") || "");

  const product = useMemo(() => {
    return IMPROVE_PLAYER_BOOSTERS.find(
      (item) =>
        item.code === code &&
        item.category === category
    );
  }, [code, category]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030608] px-5 text-white">
        <div className="w-full max-w-md border border-red-400/30 bg-[#071017] p-6 text-center">
          <p className="text-sm font-black text-red-300">
            Booster selection not found.
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

  function confirmSelection(
    selected: ImprovePlayerBoosterProduct
  ) {
    router.push(
      `/profile/rewards/improve-player/${category}/request?code=${encodeURIComponent(
        selected.code
      )}`
    );
  }

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">

        <header className="sticky top-0 z-30 border-b border-cyan-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl font-black text-cyan-300"
            >
              ‹
            </button>

            <div className="flex flex-col items-center">

              <img
                src="/teez-app-icon-v4.png"
                alt="TEEZ Golf Challenges"
                className="h-16 w-16 object-contain"
              />

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.30em] text-cyan-400">
                Improve Player Booster
              </p>

              <h1 className="text-base font-black text-white">
                CONFIRM BOOSTER
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>

        </header>


        <div className="px-4 pt-5">

          <section className="overflow-hidden border border-amber-400/40 bg-[#100c04]">

            <div className="aspect-square bg-white">

              <img
                src={product.image}
                alt={product.productName}
                className="h-full w-full object-contain p-4"
              />

            </div>


            <div className="p-5">

              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                Selected Booster
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {product.productName}
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {product.description}
              </p>


              <div className="mt-4 border border-cyan-400/20 bg-cyan-400/[0.05] p-3">

                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-400">
                  Item Code
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {product.code}
                </p>

              </div>


              <p className="mt-4 text-xs leading-5 text-slate-500">
                Confirm this selection. The item code and product description will be used for fulfilment.
              </p>


              <button
                type="button"
                onClick={() =>
                  confirmSelection(product)
                }
                className="mt-5 w-full bg-amber-400 px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-black"
              >
                Confirm Booster
              </button>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}