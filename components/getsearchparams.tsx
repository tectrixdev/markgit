"use client";
import { useSearchParams } from "next/navigation";

export default function GetSearchParams() {
  const search = useSearchParams();
  const params = search.get("installation_id")?.toString;
  if (params) {
    return params;
  } else {
    const error: string = "error";
    return error;
  }
}
