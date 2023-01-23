"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
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
      className={`fixed inset-x-0 z-50 backdrop-blur duration-1000 border-b  ${
        isScrolled ? "bg-stone-50/80" : "bg-stone-50/0 border-transparent"
      }`}
    >
      <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
        <div className="flex justify-between gap-8">
          <Link
            target="_blank"
            href="https://github.com/chronark/starlog/issues/new?assignees=chronark&labels=new+project&template=add-my-project.md"
          >
            <span className="duration-150 whitespace-nowrap text-stone-600 hover:text-stone-900">Submit A Project</span>
          </Link>
          <Link href="/analytics">
            <span className="duration-150 text-stone-600 hover:text-stone-900 ">Analytics</span>
          </Link>
          <Link target="_blank" href="https://github.com/chronark/starlog">
            <span className="duration-150 text-stone-600 hover:text-stone-900 ">GitHub</span>
          </Link>
        </div>
        {pathname !== "/" ? (
          <Link href="/" className="duration-150 text-stone-600 hover:text-stone-900 hover:scale-110">
            <ArrowLeftIcon className="w-6 h-6 " />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
