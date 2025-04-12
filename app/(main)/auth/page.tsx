"use client";
import GetSearchParams from "@/components/getsearchparams";
import { Suspense } from "react";

export default async function page() {
  return (
    <Suspense fallback={<>loading...</>}>
      <>{GetSearchParams}</>
    </Suspense>
  );
}
