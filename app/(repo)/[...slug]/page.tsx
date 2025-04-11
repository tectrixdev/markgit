import { Octokit, App } from "octokit";

export default async function Repo({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug.length == 2) {
    const octokit = new Octokit();
    const response = await octokit.request("GET /repos/{owner}/{repo}/", {
      owner: `${slug[0]}`,
      repo: `${slug[1]}`,
    });
    const api = response.data;
    return api.id;
  } else {
    return "Invalid repo format";
  }
}
