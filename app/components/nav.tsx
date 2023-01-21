"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 z-50 backdrop-blur lg:backdrop-blur-none duration-1000 border-b  ${
        isScrolled
          ? "bg-stone-50/50 lg:bg-transparent border-stone-200 lg:border-transparent"
          : "bg-stone-50/0 border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between p-6 mx-auto">
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
