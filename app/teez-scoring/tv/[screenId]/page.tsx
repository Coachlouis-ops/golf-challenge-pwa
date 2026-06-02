"use client";

import { useParams } from "next/navigation";

export default function TvBroadcastPage() {

  const params = useParams();

  const screenId = params.screenId as string;

  return (

    <main className="w-screen h-screen bg-black text-white overflow-hidden">

      <div className="w-full h-full flex flex-col items-center justify-center">

        <h1 className="text-6xl font-black text-green-400 mb-6">
          TEEZ TV BROADCAST
        </h1>

        <p className="text-3xl text-white">
          Screen:
        </p>

        <p className="text-5xl font-bold mt-2">
          {screenId}
        </p>

      </div>

    </main>

  );
}