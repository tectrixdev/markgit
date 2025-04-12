"use server";
import { Octokit, App } from "octokit";
import Link from "next/link";

export default async function Repo({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = (await searchParams).token;
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
      console.error(error);
      return (
        <>
          <p>authentication failed, return to </p>
          <Link href={`/auth?repo=${slug[0] + "/" + slug[1]}`}>
            authentication page
          </Link>
          <p>to continue</p>
        </>
      );
    }
  }
}
