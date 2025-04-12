"use server";
//example:  ?code=df34d235b3224a59e786
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import { Octokit } from "octokit";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const code = (await searchParams).code;
  const state = (await searchParams).state;
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
  const octokit = new Octokit({
    auth: token,
  });
  const response = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const data = JSON.stringify(response.data);
  return <p>{data}</p>;
}
