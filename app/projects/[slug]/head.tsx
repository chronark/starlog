import { allProjects } from "@/.contentlayer/generated";

export default function Head(props: { params: { slug: string } }) {
  let title = "starlog.dev";
  let subtitle = "A showcase of awesome open source projects and templates to help you build your next serverless app.";
  let authors = "";

  const project = allProjects.find((project) => project.slug === props.params.slug);
  if (project) {
    title = project.title;
    subtitle = project.description!;
    authors = project.authors.join(",");
  }

  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

  const url = new URL("/api/v1/og", baseUrl);
  url.searchParams.set("title", title);
  url.searchParams.set("subtitle", subtitle);
  url.searchParams.set("authors", authors);

  return (
    <>
      <title>EnvShare</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={title} />
      <meta property='og:image' content={url.toString()} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  );
}
