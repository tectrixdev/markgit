"use client";
import { useSearchParams } from "next/navigation";

export default async function page() {
  const search = useSearchParams();
  const params = search.getAll;
  return params;
}
