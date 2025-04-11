"use client";
import { useSearchParams } from "next/navigation";

export default function Getcode() {
  const search = useSearchParams();
  const param = search.get("code");
  return param;
}
