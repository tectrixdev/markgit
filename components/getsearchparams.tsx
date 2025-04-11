"use client";
import { useSearchParams } from "next/navigation";

export default function GetSearchParams(search: string) {
  const params = useSearchParams();
  const param = params.get(search);
  return param;
}
