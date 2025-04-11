import type { Metadata } from "next";
import type { Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "markgit",
  description: "A markdown editor for GitHub",
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-screen h-screen overflow-none">
      <body className="bg-black flex items-center flex-col p-5 text-center w-full h-full">
        {children}
      </body>
    </html>
  );
}
