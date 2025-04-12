"use server";
import { Octokit, App } from "octokit";
import Link from "next/link";
import { RequestError } from "octokit";
import { Url } from "next/dist/shared/lib/router/router";

export default async function Repo({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = (await searchParams).token;
  const { slug } = await params;
  const octokit = new Octokit({
    appId: process.env.GITHUB_ID!,
    privateKey: `${process.env.GITHUB_PRIVATE}`,
    oauth: {
      clientId: `${process.env.GITHUB_CLIENT}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    },
  });
  if (slug.length == 2) {
    try {
      // Exchanges the code for the user access token authentication on first call
      // and caches the authentication for successive calls
      const repo = await octokit.request("GET /repos/{owner}/{repo}/contents", {
        owner: `${slug[0]}`,
        repo: `${slug[1]}`,
      });
      const response = JSON.stringify(repo.data);
      const files = repo.data.length;
      return (
        <div className="flex gap-2 flex-col">
          {repo.data.map((item) => (
            <Link
              href={`/${slug[0]}/${slug[1]}/${item.path}`}
              style={{
                background: `white`,
                padding: `10px`,
                marginTop: `10px`,
                borderRadius: `10px`,
                textAlign: `center`,
                color: `black`,
              }}
              key={item.name}
            >
              {item.type == "dir" ? item.path + "/" : item.path}
            </Link>
          ))}
        </div>
      );
    } catch (error) {
      // Octokit errors are instances of RequestError, so they always have an `error.status` property containing the HTTP response code.
      if (error instanceof RequestError) {
        // handle Octokit error
        // error.message; // Oops
        // error.status; // 500
        // error.request; // { method, url, headers, body }
        // error.response; // { url, status, headers, data }
        return (
          <>
            <h4>{error.message}</h4>
            <p>repo content fetching failed</p>
          </>
        );
      } else {
        // handle all other errors
        throw error;
      }
    }
  } else if (slug.length > 2) {
    try {
      // Exchanges the code for the user access token authentication on first call
      // and caches the authentication for successive calls
      var path = `${slug[2]}`;
      for (let i = 3; i < slug.length; i++) {
        path = path + "/" + slug[i];
      }
      path = encodeURI(path);
      const repo = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: `${slug[0]}`,
          repo: `${slug[1]}`,
          path: `/${path}`,
        }
      );
      const response = repo.data;
      const files = repo.data.length;
      if (!files) {
        return (
          <div className="flex gap-2 flex-col">
            <p
              style={{
                background: `white`,
                padding: `10px`,
                marginTop: `10px`,
                borderRadius: `10px`,
                textAlign: `center`,
                color: `black`,
              }}
              key={response.name}
            >
              {atob(response.content)}
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex gap-2 flex-col">
            {response.map((item) => (
              <Link
                href={`/${slug[0]}/${slug[1]}/${item.path}`}
                style={{
                  background: `white`,
                  padding: `10px`,
                  marginTop: `10px`,
                  borderRadius: `10px`,
                  textAlign: `center`,
                  color: `black`,
                }}
                key={item.name}
              >
                {item.type == "dir" ? item.path + "/" : item.path}
              </Link>
            ))}
          </div>
        );
      }
    } catch (error) {
      // Octokit errors are instances of RequestError, so they always have an `error.status` property containing the HTTP response code.
      if (error instanceof RequestError) {
        // handle Octokit error
        // error.message; // Oops
        // error.status; // 500
        // error.request; // { method, url, headers, body }
        // error.response; // { url, status, headers, data }
        return (
          <>
            <h4>{error.message}</h4>
            <h5>{error.request.url}</h5>
            <p>repo content fetching failed</p>
          </>
        );
      } else {
        // handle all other errors
        throw error;
      }
    }
  }
}
