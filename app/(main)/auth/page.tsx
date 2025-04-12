"use server";
//example:  ?code=df34d235b3224a59e786
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import login from "@/components/login";

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
    // set cookie here
    return <p>authentication successful</p>;
  } catch (error) {
    login();
  }
}
