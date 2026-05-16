"use client";
import Link from "next/link";
export default function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="bg-mist-800 p-6 rounded">
      <h1 className="text-3xl mb-2 font-bold w-max">{title}</h1>
      <h2 className="text-xl text-gray-600">
        {description}
      </h2>
    </Link>
  );
}
