"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const search = useSearchParams();
  const params = search.getAll;
  return (
    <Suspense fallback={"loading..."}>
      <p>{params.toString()}</p>
    </Suspense>
  );
}
