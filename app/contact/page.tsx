"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
  const res = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "contact",
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });

  const data = await res.json();
  console.log("API RESPONSE:", data);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  setSuccess(true);
  setForm({ name: "", email: "", message: "" });
} catch (err) {
  console.error("FRONTEND ERROR:", err);
}

    setLoading(false);
  };

 return (
  <main className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">

    {/* ================= HEADER ================= */}
    <div className="w-full max-w-2xl flex items-center justify-between mb-8">

      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center flex-1">
        Contact Us
      </h1>

      <div className="w-[60px]" />

    </div>

    {/* ================= COMPANY INFO ================= */}
    <div className="max-w-2xl w-full text-center mb-12">

      <p className="text-gray-400 text-sm mb-4">
        Teez Golf Challenges is operated by Honey Badger Technologies PTY LTD.
      </p>

      <p className="text-gray-400 text-sm">
        South Africa<br />
        Email: info@honeybadgertech.com
      </p>

    </div>

    {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="px-4 py-3 rounded bg-[#111] border border-gray-700 text-white"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="px-4 py-3 rounded bg-[#111] border border-gray-700 text-white"
        />

        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={6}
          className="px-4 py-3 rounded bg-[#111] border border-gray-700 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#00ff88] text-black py-3 rounded font-semibold hover:scale-105 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-400 text-sm text-center mt-2">
            Message sent successfully.
          </p>
        )}
      </form>

    </main>
  );
}