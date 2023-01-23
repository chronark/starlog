"use client";

import { AreaChart } from "@tremor/react";

type Props = {
  data: {
    time: number;
    views: Record<string, number>;
  }[];
};

export const Chart: React.FC<Props> = ({ data }) => {
  return (
    <AreaChart
      data={data.map((d) => ({
        time: new Date(d.time).toLocaleString(),
        Views: Object.values(d.views).reduce((a, b) => a + b, 0),
      }))}
      categories={["Views"]}
      dataKey="time"
      colors={["blue"]}
    />
  );
};
