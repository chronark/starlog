import Link from "next/link";
import { allProjects, allAuthors, Project } from "contentlayer/generated";
import { Time } from "./components/time";
import mql from "@microlink/mql";
import { Navigation } from "./components/nav";
import { AnimatedTooltip } from "./components/animted-tooltip";
import { parseData } from "@/lib/parseData";

export const revalidate = 360;

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R;
}

const Project = asyncComponent(async ({ project }: { project: Project }) => {
  const image = await mql(project.url, {
    screenshot: true,
    waitForTimeout: 2000,
    apiKey: process.env.MICROLINK_TOKEN,
  }).catch(() => null);

  const stars = await fetch(`https://api.github.com/repos/${project.repository}`, {
    headers: {
      Authorization: `Bearer: ${process.env.GITHUB_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json.stargazers_count as number);

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-5 xl:items-start xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="leading-6 font-display text-stone-700 ">
            <Time time={project.date} format="date" />
          </dd>
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-start gap-4 font-display md:items-center md:flex-row lg:max-w-xl">
                {allAuthors
                  .filter((a) => project.authors.includes(a.slug))
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={a.twitter.url}
                      target="_blank"
                      className="flex-shrink-0 block group"
                    >
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block rounded-full h-9 w-9"
                            src={a.avatar}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900">
                            {a.name}
                          </p>
                          <p className="text-xs font-medium text-stone-500 group-hover:text-stone-700">
                            {a.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="flex items-center justify-end">
                {stars ? (
                  <Link
                    href={`https://github.com/${project.repository}`}
                    target="_blank"
                    className="text-xs hover:underline"
                  >
                    <span className="text-sm font-medium text-stone-900">
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(10)}
                    </span>{" "}
                    Stars on GitHub
                  </Link>
                ) : null}{" "}
              </div>
            </div>

            <div className="overflow-auto duration-500 rounded shadow-xl md:rounded-xl lg:rounded-2xl hover:shadow-2xl border-stone-300">
              <Link href={project.path}>
                {image?.data?.screenshot?.url ? (
                  <img
                    src={image.data.screenshot.url}
                    alt={`Screenshot of ${project.url}`}
                  />
                ) : null}
              </Link>
            </div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight font-display">
              <Link
                target="_blank"
                href={project.dubUrl}
                className="text-stone-900 dark:text-stone-100"
              >
                {project.title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-2 font-display">
              {project.tech?.map((tag) => (
                <p
                  key={tag}
                  className="capitalize px-1.5 py-0.5 bg-stone-50 text-xs font-medium text-stone-500 hover:bg-stone-100 duration-150 border rounded-full border-stone-300 group-hover:text-stone-700"
                >
                  {tag}
                </p>
              ))}
            </div>

            <div className="prose text-stone-500 max-w-none dark:text-stone-400">
              {project.description}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link
              href={project.path}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Read "${project.title}"`}
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
});

export default async function BlogPage() {
  const projects = allProjects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const parsedData = parseData();
  return (
    <div>
      <Navigation />

      <main className=" bg-gradient-to-tr from-stone-100 via-white to-stone-200">
        <div className="relative px-6 lg:px-8">
          <div className="max-w-3xl pt-20 pb-24 mx-auto sm:pt-48 sm:pb-32">
            <div>
              <div>
                <h1 className="text-4xl font-bold uppercase font-display text-stone-900 sm:text-center sm:text-6xl">
                  starlog.dev
                </h1>
                <p className="mt-6 text-lg font-medium leading-8 tracking-tight font-regular text-stone-500 sm:text-center">
                  A showcase of awesome open source projects and templates to
                  help you build your next serverless app.
                </p>

                <div className="mt-16">
                  <h3 className="text-sm text-center text-stone-900 font-display mb-2">
                    Featuring
                  </h3>
                  <div className="flex flex-row items-center justify-center mb-10 w-full">
                    <AnimatedTooltip items={parsedData} />
                  </div>
                  {/* the code below is the previous implementation for showcasing the contributors */}
                  {/* <ul className="flex items-center justify-center w-full mt-4 -space-x-2 overflow-hidden ">
                    {allAuthors
                      .sort((a, b) => Math.random() - 0.5)
                      .map((author) => (
                        <Link
                          key={author.slug}
                          target="_blank"
                          href={author.twitter.url}
                        >
                          <img
                            className="relative z-30 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                            src={author.avatar}
                            alt={author.name}
                          />
                        </Link>
                      ))}
                  </ul> */}
                </div>

                {/* <div className="flex mt-8 gap-x-4 sm:justify-center">
                                    <a
                                        href="#"
                                        className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                                    >
                                        Get started{' '}
                                        <span className="text-indigo-200" aria-hidden="true">
                                            &rarr;
                                        </span>
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-stone-900 ring-1 ring-stone-900/10 hover:ring-stone-900/20"
                                    >
                                        Live demo{' '}
                                        <span className="text-stone-400" aria-hidden="true">
                                            &rarr;
                                        </span>
                                    </a>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="border-t border-stone-200">
        <ul className="flex flex-col">
          {projects.map((p) => {
            return (
              <li
                id={p.slug}
                key={p.path}
                className="py-12 border-t border-stone-300/30 bg-gradient-to-t from-stone-100 to-white "
              >
                <div className="container px-4 mx-auto">
                  <Project project={p} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
