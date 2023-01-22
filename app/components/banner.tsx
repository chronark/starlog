"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Banner: React.FC = () => {
  return (
    <div className="w-full bg-black font-display">
      <div className="container flex items-center justify-center px-4 py-2 mx-auto text-sm text-stone-50 ">
        <Link className="hover:underline" target="_blank" href="https://github.com/chronark/starlog">
          STARLOG is open source on <span className="font-medium">GitHub</span>
        </Link>
      </div>
    </div>
  );
};
