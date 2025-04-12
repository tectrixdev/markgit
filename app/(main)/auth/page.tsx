"use server";
//example:  ?code=df34d235b3224a59e786
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import login from "@/components/login";
import setCookie from "@/components/setcookies";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const code = (await searchParams).code;
  const state = (await searchParams).state;
  if (!code) {
    login();
  }
  const auth = createOAuthUserAuth({
    clientId: "Iv23lilTSFxvqmY2Ojft",
    clientSecret: `${process.env.GITHUB_SECRET}`,
    code: `${code}`,
    // optional
    state: `${state}`,
  });
  try {
    // Exchanges the code for the user access token authentication on first call
    // and caches the authentication for successive calls
    const { token } = await auth();
    setCookie("token", token, { maxAge: 3600 });
    return <p>authentication successful</p>;
  } catch (error: any) {
    return (
      <>
        <p>{error}</p>
        <p>authentication failed, return to </p>
        <Link href="/auth">authentication page</Link>
        <p>to continue</p>
      </>
    );
  }
}
