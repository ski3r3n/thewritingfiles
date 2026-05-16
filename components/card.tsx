"use client";
import Link from "next/link";
export default function Card({
  title,
  author,
  date,
  href,
}: {
  title: string;
  author: string;
  date: string;
  href: string;
}) {
  return (
    <Link href={href} className="bg-mist-800 p-6 rounded">
      <h1 className="text-3xl mb-2 font-bold">{title}</h1>
      <h2 className="text-xl text-gray-400">
        By: {author} | Date: {date}
      </h2>
    </Link>
  );
}
