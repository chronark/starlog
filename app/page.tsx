import Link from "next/link";
import { allProjects, allAuthors } from "contentlayer/generated";
import PagesManifestPlugin from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import { Time } from "./components/time";

export default async function BlogPage() {
  const projects = allProjects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <main className=" bg-gradient-to-tr from-stone-100 via-white to-stone-200">
        <div className="relative px-6 lg:px-8">
          <div className="max-w-3xl pt-20 pb-32 mx-auto sm:pt-48 sm:pb-40">
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
        <ul className="container flex flex-col gap-4 mx-auto md:gap-16">
          {projects.map((p) => {
            return (
              <li key={p.path} className="py-12 border-t border-stone-300/30">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <Time time={p.date} format="date" />
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        {allAuthors
                          .filter((a) => p.authors.includes(a.slug))
                          .map((a) => (
                            <a href="#" className="flex-shrink-0 block group">
                              <div className="flex items-center">
                                <div>
                                  <img className="inline-block rounded-full h-9 w-9" src={a.avatar} alt="" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    {a.name}
                                  </p>
                                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                    {a.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}

                        <div>
                          <h2 className="text-4xl font-bold leading-8 tracking-tight">
                            <Link href={p.path} className="text-gray-900 dark:text-gray-100">
                              {p.title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {p.tech?.map((tag) => (
                              <p className="capitalize px-1.5 py-0.5 bg-stone-50 text-xs font-medium text-gray-500 hover:bg-stone-100 duration-150 border rounded-full border-stone-300 group-hover:text-gray-700">
                                {tag}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">{p.description}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={p.path}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${p.title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
