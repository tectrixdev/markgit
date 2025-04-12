import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function install() {
  const cookieJar = await cookies();
  const installation = cookieJar.get("installation_id");
  if (!installation) {
    redirect("https://github.com/apps/markgit-bot/installations/new/");
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-white">App already installed</h1>
        <p className="text-gray-400">please continue to using the app</p>
      </div>
    );
  }
}
