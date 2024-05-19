"use client";

import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/app/components/stop/stopSearch"));

export default function Index() {
  return (
    <div className="w-full">
      <div className="mt-64 flex flex-col gap-8 justify-center items-center text-center">
        <Search />
      </div>
    </div>
  );
}
