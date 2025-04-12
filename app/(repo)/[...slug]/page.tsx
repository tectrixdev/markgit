"use server";
import { Octokit, App } from "octokit";
import Link from "next/link";

export default async function Repo({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug.length == 2) {
    try {
      const octokit = new Octokit({
        auth: token,
      });
      const response = await octokit.request("GET /repos/{owner}/{repo}/", {
        owner: `${slug[0]}`,
        repo: `${slug[1]}`,
      });
      const api = JSON.stringify(response.data);
      return api;
    } catch (error) {
      return (
        <>
          <p>authentication failed, return to </p>
          <Link href="/auth">authentication page</Link>
          <p>to continue</p>
        </>
      );
    }
  }
}
