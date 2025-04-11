"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const param = useSearchParams().get("code");
  await fetch(
    `https://github.com/login/oauth/access_token?client_id=Iv23lilTSFxvqmY2Ojft&client_secret=
        ${process.env.client_secret}&code=${param}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* request body */
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return <Suspense>{data}</Suspense>;
    })
    .catch((error) => {
      // Handle any errors
    });
}
