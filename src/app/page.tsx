"use client";

import dynamic from "next/dynamic";

const TicTacToe = dynamic(() => import("~/components/TicTacToe"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <TicTacToe />
    </main>
  );
}
////