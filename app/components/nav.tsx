"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Navigation: React.FC = () => {
  return (
    <div className="fixed inset-x-0 z-50">
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="duration-150 text-stone-600 hover:text-stone-900 hover:scale-110">
          <ArrowLeftIcon className="w-6 h-6 " />
        </Link>
        <Link target="_blank" href="https://github.com/chronark/starlog">
          <span className="font-medium">GitHub</span>
        </Link>
      </div>
    </div>
  );
};
