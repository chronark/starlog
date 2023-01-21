import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { allAuthors } from "@/.contentlayer/generated";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Redundant fallback alternate tagline
    const title = searchParams.get("title") ?? "starlog.dev";
    const subtitle =
      searchParams.get("subtitle") ??
      "A showcase of awesome open source projects and templates to help you build your next serverless app.";
    const authorsParam = searchParams.get("authors");
    const authors = (authorsParam ? authorsParam.split(",") : []).map(
      (slug) => allAuthors.find((a) => a.slug === slug)!,
    );

    const font = await fetch(new URL("../../../public/fonts/PangeaAfrikanTrial-SemiBold.woff", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    );

    // TODO: Fix tailwind classes on this route
    return new ImageResponse(
      <div tw="flex w-full h-full justify-center items-center flex-col font-display bg-white">
        <h1 tw="text-4xl font-bold text-stone-900 sm:text-center sm:text-6xl uppercase">{title}</h1>
        <p tw="mt-6 text-lg leading-8 text-stone-600 sm:text-center">{subtitle} </p>
        <ul tw="flex items-center justify-center w-full mt-4 overflow-hidden ">
          {authors.map((author) => (
            <div key={author.slug} tw="flex items-center gap-4 p-4 duration-500 group">
              <img
                tw="relative z-30 inline-block w-16 h-16 duration-500 rounded-full group-hover:scale-105"
                src={author.avatar}
                alt={author.name}
              />
              <div tw="flex flex-col pl-4">
                <span tw="font-medium text text-stone-700 group-hover:text-stone-900">{author.name}</span>
                <span tw="text-sm font-medium text-stone-500 group-hover:text-stone-700">{author.description}</span>
              </div>
            </div>
          ))}
        </ul>
      </div>,
      {
        height: 630,
        width: 1200,
        emoji: "twemoji",
        fonts: [
          {
            name: "Pangea",
            data: font,
            style: "normal",
          },
        ],
      },
    );
  } catch (e) {
    console.log(`${(e as Error).message}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
