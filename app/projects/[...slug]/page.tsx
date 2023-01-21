import { notFound } from "next/navigation";
import { allAuthors, allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import "@/styles/mdx.css";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allProjects.map((p) => ({
    slug: p.slug.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const authors = project.authors.map((slug) => allAuthors.find((a) => a.slug === slug)!);

  return (
    <div className="relative">
      <Navigation />
      <header className=" bg-gradient-to-tr from-stone-100 via-white to-stone-200">
        <div className="relative px-6 lg:px-8">
          <div className="max-w-3xl pt-20 pb-16 mx-auto sm:pt-48">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-center sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-stone-600 sm:text-center">{project.description} </p>

              <div className="mt-16 lg:mt-24">
                {/* <h3 className="text-sm font-medium text-center text-stone-500">Created by</h3> */}
                <ul className="flex items-center justify-center w-full mt-4 overflow-hidden ">
                  {authors.map((author) => (
                    <Link
                      key={author.slug}
                      target="_blank"
                      href={author.twitter.url}
                      className="flex items-center gap-2 p-4 duration-500 group"
                    >
                      <img
                        className="relative z-30 inline-block w-16 h-16 duration-500 rounded-full group-hover:scale-105"
                        src={author.avatar}
                        alt={author.name}
                      />
                      <div className="flex flex-col">
                        <p className="font-medium text text-stone-700 group-hover:text-stone-900">{author.name}</p>
                        <p className="text-sm font-medium text-stone-500 group-hover:text-stone-700">
                          {author.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            target="_blank"
            className="px-4 py-2 font-semibold text-right duration-500 border-b border-transparent text-stone-800 hover:border-stone-900"
            href={project.dubUrl}
          >
            Website
          </Link>
          <Link
            target="_blank"
            className="px-4 py-2 font-semibold text-left duration-500 border-b border-transparent text-stone-800 hover:border-stone-900"
            href={`https://github.com/${project.repository}`}
          >
            Repository
          </Link>
        </div>
      </header>
      <main className="border-t border-stone-200">
        <article className="py-12 mx-auto prose lg:prose-lg ">
          <Mdx code={project.body.code} />
        </article>
      </main>
    </div>
  );
}
