"use client";

import { useMemo, useState } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getFunctions,
  httpsCallable,
} from "firebase/functions";

import {
  IMPROVE_PLAYER_BOOSTERS,
} from "@/src/data/improvePlayerBoosters";

export default function BoosterRequestPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const category =
    String(params.category || "");

const code =
  String(searchParams.get("code") || "");

const ballNumber =
  Number(searchParams.get("ball") || 0);

  const [submitting, setSubmitting] =
  useState(false);

const [submitError, setSubmitError] =
  useState("");

const [submitted, setSubmitted] =
  useState(false);

  const product = useMemo(() => {
    return IMPROVE_PLAYER_BOOSTERS.find(
      (item) =>
        item.code === code &&
        item.category === category
    );
  }, [code, category]);


  async function submitBoosterRequest() {
  if (
    !product ||
    !Number.isInteger(ballNumber) ||
    ballNumber < 1
  ) {
    setSubmitError(
      "Invalid Booster Ball selection."
    );
    return;
  }

  try {
    setSubmitting(true);
    setSubmitError("");

    const functions =
      getFunctions(undefined, "europe-west1");

    const submitRequest =
      httpsCallable<
        {
          ballNumber: number;
          category: string;
          productCode: string;
        },
        {
          success: boolean;
          request: {
            requestId: string;
            status: string;
          };
        }
      >(
        functions,
        "submitImprovePlayerBoosterRequest"
      );

    await submitRequest({
      ballNumber,
      category,
      productCode: product.code,
    });

    setSubmitted(true);
  } catch (error) {
    console.error(
      "Unable to submit Booster request:",
      error
    );

    setSubmitError(
      "Unable to submit your Booster request. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
}

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

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">

        {/* HEADER */}

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
                className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(0,174,255,0.75)]"
              />

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.30em] text-cyan-400">
                Improve Player Booster
              </p>

              <h1 className="text-base font-black text-white">
                BOOSTER REQUEST
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>

        </header>


        <div className="space-y-5 px-4 pt-5">

          {/* SELECTED BOOSTER */}

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
                Your Selected Booster
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {product.productName}
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {product.description}
              </p>

              <div className="mt-4 border border-cyan-400/20 bg-cyan-400/[0.05] p-3">

                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-400">
                  Unique Item Code
                </p>

                <p className="mt-1 text-base font-black text-white">
                  {product.code}
                </p>

              </div>

            </div>

          </section>


          {/* DELIVERY PROCESS */}

          <section className="border border-cyan-400/30 bg-[#071017] p-5">

            <p className="text-[9px] font-black uppercase tracking-[0.20em] text-cyan-400">
              What Happens Next
            </p>

            <div className="mt-4 space-y-3">

              <ProcessStep
                number="1"
                text="Your selected Booster and unique item code are sent to TEEZ."
              />

              <ProcessStep
                number="2"
                text="TEEZ verifies the exact physical item selected."
              />

              <ProcessStep
                number="3"
                text="You receive an email regarding delivery arrangements."
              />

              <ProcessStep
                number="4"
                text="Your physical Booster is delivered to you."
              />

            </div>

          </section>


          {/* IMPORTANT */}

          <section className="border border-amber-400/30 bg-amber-400/[0.05] p-4">

            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-amber-300">
              Physical Booster
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              No voucher or digital reward will be issued.
              Fulfilment and delivery will be arranged directly
              with you by email.
            </p>

          </section>


          {/* HOOKUP PLACEHOLDER */}

       {submitted ? (
  <div className="border border-emerald-400/40 bg-emerald-400/[0.08] p-5 text-center">
    <p className="text-sm font-black uppercase tracking-[0.12em] text-emerald-300">
      Booster Request Submitted
    </p>

    <p className="mt-2 text-xs leading-5 text-slate-400">
      TEEZ will contact you by email regarding fulfilment and delivery.
    </p>
  </div>
) : (
  <>
    <button
      type="button"
      onClick={submitBoosterRequest}
      disabled={submitting}
      className="w-full bg-cyan-400 px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-black disabled:opacity-50"
    >
      {submitting
        ? "Submitting..."
        : "Submit Booster Request"}
    </button>

    {submitError && (
      <p className="text-center text-xs font-bold text-red-300">
        {submitError}
      </p>
    )}
  </>
)}

        </div>

      </div>
    </main>
  );
}


function ProcessStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.06] text-[9px] font-black text-cyan-300">
        {number}
      </div>

      <p className="pt-1 text-xs leading-5 text-slate-400">
        {text}
      </p>

    </div>
  );
}