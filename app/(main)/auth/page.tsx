"use server";
//example:  ?code=df34d235b3224a59e786
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import { Octokit } from "octokit";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieJar = await cookies();
  const code = (await searchParams).code;
  const state = (await searchParams).state;
  if (!code) {
    const login: string = `https://github.com/login/oauth/authorize?client_id=Iv23lilTSFxvqmY2Ojft&state=${Math.floor(
      Math.random() * 10000000000
    )}&allow_signup=true`;
    redirect(login);
  }
  const auth = createOAuthUserAuth({
    clientId: "Iv23lilTSFxvqmY2Ojft",
    clientSecret: `${process.env.GITHUB_SECRET}`,
    code: `${code}`,
    // optional
    state: `${state}`,
  });

  // Exchanges the code for the user access token authentication on first call
  // and caches the authentication for successive calls
  const { token } = await auth();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const expirationDate = new Date(Date.now() + oneHour);
  cookieJar.set("token", token, { expires: expirationDate });
  return <p>authentication succesful</p>;
}
