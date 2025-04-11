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
    const login = `https://github.com/login/oauth/authorize?client_id=Iv23lilTSFxvqmY2Ojft&state=${Math.floor(
      Math.random() * 1000
    )}&allow_signup=true`;
    return login;
  } else {
    return "Invalid repo format";
  }
}
