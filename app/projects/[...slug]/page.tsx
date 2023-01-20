import { notFound } from "next/navigation";
import { allAuthors, allProjects } from "contentlayer/generated";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Mdx } from "@/app/components/mdx";
import "@/styles/mdx.css";
import Link from "next/link";
import Image from "next/image";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allProjects.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");
  const project = allProjects.find((project) => project.slugAsParams === slug);

  if (!project) {
    notFound();
  }

  const authors = project.authors.map((author) => allAuthors.find(({ slug }) => slug === `/authors/${author}`)!);

  return <article className="container relative max-w-3xl py-6 lg:py-10">{project.title}</article>;
}
