"use client";
import { useSearchParams } from "next/navigation";

export default function GetSearchParams() {
  const search = useSearchParams();
  const param = search.get("code");
}
