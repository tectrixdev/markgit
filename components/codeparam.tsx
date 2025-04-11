"use client";
import { useSearchParams } from "next/navigation";

const search = useSearchParams();
const param = search.get("code");
export default param;
