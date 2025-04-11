"use client";
import { useSearchParams, redirect } from "next/navigation";

export default async function page() {
  const search = useSearchParams();
  const param = search.get("code");
  const fetchurl = `https://github.com/login/oauth/access_token?client_id=Iv23lilTSFxvqmY2Ojft&client_secret=${process.env.client_secret}&code=${param}`;
  const response = await fetch(fetchurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  } else {
    return "Error fetching access token";
  }
}
