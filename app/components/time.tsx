"use client";

import React from "react";

type Props = {
  time: Date | string | number;
  format?: "date" | "time";
};
export const Time: React.FC<Props> = ({ time, format }) => {
  const date = typeof time === "string" || typeof time === "number" ? new Date(time) : time;

  let s = date.toLocaleString();
  if (format === "date") {
    s = date.toLocaleDateString();
  }
  if (format === "time") {
    s = date.toLocaleTimeString();
  }
  return <time dateTime={date.toISOString()}>{s}</time>;
};
