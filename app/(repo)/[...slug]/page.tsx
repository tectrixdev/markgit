"use server";
import { Octokit, App } from "octokit";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Repo({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const cookieJar = await cookies();
  const { slug } = await params;
  if (!cookieJar.get("token")) {
    redirect("/auth");
  }
  if (slug.length == 2) {
    const octokit = new Octokit({
      auth: cookieJar.get("token"),
    });
    const response = await octokit.request("GET /repos/{owner}/{repo}/", {
      owner: `${slug[0]}`,
      repo: `${slug[1]}`,
    });
    const api = JSON.parse(response.data);
    return api;
  }
}
