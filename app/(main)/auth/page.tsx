"use server";
//example:  ?code=df34d235b3224a59e786
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import { App } from "octokit";
import { Octokit } from "octokit";
import login from "@/components/login";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RequestError } from "octokit";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const app = new App({
    appId: process.env.GITHUB_ID!,
    privateKey: `${process.env.GITHUB_PRIVATE}`,
    oauth: {
      clientId: `${process.env.GITHUB_CLIENT}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    },
  });
  const installationUrl = await app.getInstallationUrl();
  const code = (await searchParams).code;
  const state = (await searchParams).state;
  if (!code) {
    login();
  }
  try {
    // Exchanges the code for the user access token authentication on first call
    // and caches the authentication for successive calls
    const auth = createOAuthUserAuth({
      clientType: "github-app",
      clientId: `${process.env.GITHUB_CLIENT}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      code: `${code}`,
      state: `${state}`,
    });
    const { token } = await auth();
    const octokit = new Octokit({ auth: `${token}` });
    const {
      data: { id, login, public_repos },
    } = await octokit.rest.users.getAuthenticated();
    console.log("Hello, %s", id);
    return (
      <p>
        authentication successful, this does nothing at the moment. logged in
        as: {login}
      </p>
    );
  } catch (error) {
    // Octokit errors are instances of RequestError, so they always have an `error.status` property containing the HTTP response code.
    if (error instanceof RequestError) {
      // handle Octokit error
      // error.message; // Oops
      // error.status; // 500
      // error.request; // { method, url, headers, body }
      // error.response; // { url, status, headers, data }
      if (error.response.data.error! == "bad_verification_code") {
        login();
      }
      return (
        <>
          <h4>{error.message}</h4>
          <p>authentication failed, return to </p>
          <Link href="/auth">authentication page</Link>
          <p>to continue</p>
        </>
      );
    } else {
      // handle all other errors
      throw error;
    }
  }
}
