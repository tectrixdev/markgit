import { redirect } from "next/navigation";

export default function login() {
    const env = process.env.NODE_ENV
    var url = "";
    if(env == "development"){
        url = `http://localhost:3000/auth`
    } else if (env == "production") {
        url = `https://markgit.tectrix.dev/auth`
    }
    const login: string = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}&state=${Math.floor(
        Math.random() * 10000000000
    )}&allow_signup=true&redirect_uri=${url}`;
    redirect(login);
}