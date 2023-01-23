import { Redis } from "@upstash/redis";
import { Navigation } from "../components/nav";
import { Card, Metric, Text, Title, BarList, Flex, Col, Block, ColGrid } from "@tremor/react";
import { Chart } from "./chart";
import { allAuthors, allProjects } from "@/.contentlayer/generated";
import Link from "next/link";
export const revalidate = 60;

const redis = Redis.fromEnv();
export default async function Page() {
  const buckets: string[] = [];
  let cursor = 0;
  do {
    let keys: string[];
    [cursor, keys] = await redis.scan(cursor, { match: "pageviews:*" });

    for (const key of keys) {
      const timestamp = parseInt(key.split(":")[1]);
      if (timestamp >= Date.now() - 7 * 24 * 60 * 60 * 1000) {
        buckets.push(key);
      }
    }
  } while (cursor !== 0);

  const stars = await fetch("https://api.github.com/repos/chronark/starlog", {
    headers: {
      Authorization: `Bearer: ${process.env.GITHUB_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json.stargazers_count as number);

  const pageViews = await Promise.all(
    buckets.map(async (key) => {
      const views: Record<string, number> = {};

      const pairs = await redis.zrange<string[]>(key, 0, -1, { withScores: true });
      while (pairs.length >= 2) {
        const page = pairs.shift()!;
        const count = parseInt(pairs.shift()!);
        views[page] = count;
      }
      return { time: parseInt(key.split(":")[1]), views };
    }),
  );

  const totalPageViewsPerPage = pageViews.reduce((acc, { views }) => {
    console.log({ views });
    for (const [page, count] of Object.entries(views)) {
      acc[page] = (acc[page] || 0) + count;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalViews = Object.values(totalPageViewsPerPage).reduce((acc, count) => acc + count, 0);
  const format = (number: number) => Intl.NumberFormat("us", { notation: "compact" }).format(number).toString();

  return (
    <div className="relative">
      <Navigation />
      <header className="font-display bg-gradient-to-tr from-stone-100 via-white to-stone-200">
        <div className="relative px-6 lg:px-8">
          <div className="max-w-3xl pt-20 pb-16 mx-auto sm:pt-48">
            <h1 className="text-4xl font-bold uppercase text-stone-900 sm:text-center sm:text-6xl">Analytics</h1>
            <p className="mt-6 text-stone-600 sm:text-center">
              Powered by{" "}
              <Link className="underline duration-150 hover:text-stone-900" href="https://upstash.com?ref=starlog">
                Upstash Redis
              </Link>{" "}
              and{" "}
              <Link className="underline duration-150 hover:text-stone-900" href="https://tremor.so?ref=starlog">
                Tremor
              </Link>{" "}
            </p>
          </div>
        </div>
      </header>
      <main className="py-8 border-t lg:py-16 border-stone-200">
        <div className="container mx-auto">
          <ColGrid numCols={3} gapX="gap-x-8" gapY="gap-y-8">
            <Col numColSpan={3}>
              <Card>
                <Title>Views in last 7 days</Title>
                <Flex justifyContent="justify-start" alignItems="items-baseline" spaceX="space-x-2">
                  <Metric>{format(totalViews)}</Metric>
                  <Text>Total views</Text>
                </Flex>
                <Chart data={pageViews} />
              </Card>
            </Col>

            <Col numColSpan={2}>
              <Card>
                <div className="h-72">
                  <Title>Top Pages</Title>
                  <Flex justifyContent="justify-start" alignItems="items-baseline" spaceX="space-x-2">
                    <Metric>{format(totalViews)}</Metric>
                    <Text>Total views</Text>
                  </Flex>
                  <BarList
                    data={Object.entries(totalPageViewsPerPage)
                      .map(([name, value]) => ({ name, value }))
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)}
                    valueFormatter={format}
                    marginTop="mt-2"
                  />
                </div>
              </Card>
            </Col>
            <Col numColSpan={1}>
              <Card>
                <div className="h-72">
                  <Title>Stats</Title>
                  <ColGrid gapY="gap-y-4" marginTop="mt-8">
                    <Flex>
                      <Metric>{allAuthors.length}</Metric>
                      <Text>Authors</Text>
                    </Flex>
                    <Flex>
                      <Metric>{allProjects.length}</Metric>
                      <Text>Projects</Text>
                    </Flex>
                    {stars ? (
                      <Flex>
                        <Metric>{stars}</Metric>
                        <Text>GitHub Stars</Text>
                      </Flex>
                    ) : null}
                  </ColGrid>
                </div>
              </Card>
            </Col>
          </ColGrid>
        </div>
      </main>
    </div>
  );
}
