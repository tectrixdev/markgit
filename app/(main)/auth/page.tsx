"use server";
import param from "@/components/codeparam";

export default async function page() {
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
      return data;
    })
    .catch((error) => {
      // Handle any errors
    });
}
