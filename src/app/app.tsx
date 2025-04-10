"use client";

import dynamic from "next/dynamic";

const Demo = dynamic(() => import("~/components/Demo"), {
  ssr: false,
});

export default function Page(
  { title }: { title?: string } = { title: process.env.NEXT_PUBLIC_FRAME_NAME || "Airdrop App" }
) {
  return <Demo title={title} />;
}