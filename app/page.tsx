import Link from "next/link";
import { allProjects, allAuthors, Project } from "contentlayer/generated";
import { Time } from "./components/time";
import mql from "@microlink/mql";
import Image from "next/image";
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R;
}

const GitHub = () => {
  return (
    <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
};

const Project = asyncComponent(async ({ project }: { project: Project }) => {
  const image = await mql(project.url, {
    screenshot: true,
  });

  console.log(image.data);

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-5 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <Time time={project.date} format="date" />
          </dd>
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between flex-grow lg:max-w-xl">
                {allAuthors
                  .filter((a) => project.authors.includes(a.slug))
                  .map((a) => (
                    <Link
                      href={`https://twitter.com/${a.twitter}`}
                      target="_blank"
                      className="flex-shrink-0 block group"
                    >
                      <div className="flex items-center">
                        <div>
                          <img className="inline-block rounded-full h-9 w-9" src={a.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{a.name}</p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{a.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}

                {/* <div>
                                    <Link href={project.github} target="_blank" >
                                        <div className="w-6 h-6">

                                            <GitHub />
                                        </div>
                                    </Link>
                                </div> */}
              </div>
            </div>

            <div className="overflow-auto rounded-lg shadow-xl border-stone-300">
              {image.data.screenshot?.url ? (
                <img src={image.data.screenshot.url} alt={`Screenshot of ${project.url}`} />
              ) : null}
            </div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <Link href={project.path} className="text-gray-900 dark:text-gray-100">
                {project.title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map((tag) => (
                <p className="capitalize px-1.5 py-0.5 bg-stone-50 text-xs font-medium text-gray-500 hover:bg-stone-100 duration-150 border rounded-full border-stone-300 group-hover:text-gray-700">
                  {tag}
                </p>
              ))}
            </div>

            <div className="prose text-gray-500 max-w-none dark:text-gray-400">{project.description}</div>
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

  return (
    <div>
      <main className=" bg-gradient-to-tr from-stone-100 via-white to-stone-200">
        <div className="relative px-6 lg:px-8">
          <div className="max-w-3xl pt-20 pb-24 mx-auto sm:pt-48 sm:pb-32">
            <div>
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                    <span className="text-gray-600">
                                        Announcing our next round of funding.{' '}
                                        <a href="#" className="font-semibold text-indigo-600">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Read more <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </span>
                                </div>
                            </div> */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-center sm:text-6xl">
                  starlog.dev
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  A showcase of awesome open source serverless projects
                </p>

                <div className="mt-16">
                  <h3 className="text-sm font-medium text-center text-stone-500">Featuring</h3>
                  <ul className="flex items-center justify-center w-full mt-4 -space-x-2 overflow-hidden ">
                    {allAuthors
                      .sort((a, b) => Math.random() - 0.5)
                      .map((author) => (
                        <Link target="_blank" href={`https://twitter.com/${author.twitter}`}>
                          <img
                            className="relative z-30 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                            src={author.avatar}
                            alt={author.name}
                          />
                        </Link>
                      ))}
                  </ul>
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
                                        className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                    >
                                        Live demo{' '}
                                        <span className="text-gray-400" aria-hidden="true">
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
        <ul className="flex flex-col gap-4 md:gap-16">
          {projects.map((p) => {
            return (
              <li
                key={p.path}
                className="py-12 border-t border-stone-300/30 bg-gradient-to-t from-white via-stone-100 to-white"
              >
                <div className="container mx-auto">
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
