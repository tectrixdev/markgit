import { redirect } from "next/navigation";

export default function login(repo: string | string[] | undefined) {
    const login: string = `https://github.com/login/oauth/authorize?client_id=Iv23lilTSFxvqmY2Ojft&state=${Math.floor(
        Math.random() * 10000000000
    )}&allow_signup=true&redirect_uri=https://markgit.tectrix.dev/auth&repo=${repo}`;
    redirect(login);
}