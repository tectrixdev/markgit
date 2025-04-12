"use client";
import { useSearchParams } from "next/navigation";

export default function GetSearchParams() {
  const search = useSearchParams();
  const params = search.getAll;
  return params;
}
