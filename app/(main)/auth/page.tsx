"use client";
import GetSearchParams from "@/components/getsearchparams";

export default async function page() {
  const fetchurl = `https://github.com/login/oauth/access_token?client_id=Iv23lilTSFxvqmY2Ojft&client_secret=${process.env.client_secret}&code=${GetSearchParams}`;
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
    console.log("success");
  } else {
    return "Error fetching access token";
    console.log("Error fetching access token");
  }
}
