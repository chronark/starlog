"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Banner: React.FC = () => {
  return (
    <div className="w-screen bg-black">
      <div className="container flex items-center justify-center px-4 py-2 mx-auto text-sm text-stone-50 hover:underline">
        <Link target="_blank" href="https://github.com/chronark/starlog">
          starlog is open source on <span className="font-medium">GitHub</span>
        </Link>
      </div>
    </div>
  );
};
