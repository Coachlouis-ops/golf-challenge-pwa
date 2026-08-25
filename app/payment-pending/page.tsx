"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/src/lib/AuthContext";

export default function PaymentPendingPage() {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  const [statusMessage, setStatusMessage] =
    useState(
      "Confirming your payment with Peach Payments..."
    );

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const checkoutId =
      new URLSearchParams(
        window.location.search
      ).get("checkoutId");

    if (!checkoutId) {
      setChecking(false);

      setStatusMessage(
        "We could not identify this payment. Please return to the payment page."
      );

      return;
    }

    let stopped = false;
    let attempts = 0;

    async function checkPayment() {
      if (stopped || !user) {
        return;
      }

      try {
        attempts += 1;

        const idToken =
          await user.getIdToken();

        const response =
          await fetch(
            "/api/peach/payment-status",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${idToken}`,
              },

              body: JSON.stringify({
                checkoutId,
              }),
            }
          );

        const result =
          await response.json();

        if (
          response.ok &&
          result?.fulfilled === true
        ) {
          stopped = true;

          setChecking(false);

          setStatusMessage(
            "Payment confirmed. Your membership is active and 100 Teez Tokens have been added to your wallet."
          );

          setTimeout(() => {
            router.replace(
              "/dashboard"
            );
          }, 1500);

          return;
        }

        if (
          result?.status ===
          "cancelled"
        ) {
          stopped = true;

          setChecking(false);

          setStatusMessage(
            "The payment was cancelled. No membership or tokens were issued."
          );

          return;
        }

        if (
          result?.status ===
          "uncertain"
        ) {
          setStatusMessage(
            "Peach Payments is still confirming the final payment status. No membership or tokens will be issued until payment is confirmed."
          );
        } else {
          setStatusMessage(
            "Payment received. We are waiting for secure confirmation from Peach Payments."
          );
        }

        if (attempts >= 20) {
          stopped = true;

          setChecking(false);

          setStatusMessage(
            "Payment confirmation is taking longer than expected. Your account will activate automatically once Peach Payments confirms the payment."
          );

          return;
        }

        setTimeout(
          checkPayment,
          3000
        );
      } catch (error) {
        console.error(
          "Payment status check failed:",
          error
        );

        if (attempts >= 20) {
          stopped = true;

          setChecking(false);

          setStatusMessage(
            "We could not confirm the payment yet. Your account will only activate once Peach Payments confirms it."
          );

          return;
        }

        setTimeout(
          checkPayment,
          3000
        );
      }
    }

    checkPayment();

    return () => {
      stopped = true;
    };
  }, [
    user,
    loading,
    router,
  ]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center space-y-6">

        <h1 className="text-3xl font-bold text-green-400">
          {checking
            ? "Confirming Payment"
            : "Payment Status"}
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed">
          {statusMessage}
        </p>

        <div className="bg-black/40 border border-neutral-700 rounded-xl p-4 text-sm text-gray-400">
          Your membership and{" "}
          <span className="text-green-400 font-semibold">
            100 Teez Tokens
          </span>{" "}
          are issued only after Peach Payments securely confirms the payment.
        </div>

        {checking && (
          <div className="text-sm text-green-400">
            Checking payment status...
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            router.push("/payment")
          }
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
        >
          Back to Payment
        </button>

      </div>
    </main>
  );
}