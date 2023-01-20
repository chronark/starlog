import glob from "fast-glob";
import * as path from "path";

async function importArticle(projectFilename: string) {
  const { meta, default: component } = await import(`../pages/projects/${projectFilename}`);
  return {
    slug: projectFilename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

export async function getAllArticles() {
  const projectFilenames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "pages", "projects"),
  });

  const articles = await Promise.all(projectFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
