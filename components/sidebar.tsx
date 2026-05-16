"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiHome } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";

export default function Sidebar() {
  const pathname = usePathname();
  const linkClass = (href: string) =>
    `flex items-center px-4 py-2 rounded w-full
    ${
      pathname === href
        ? "bg-mist-900 text-white"
        : "text-mist-400 hover:text-white"
    }`;
  return (
    <div className="w-64 h-screen bg-mist-800 text-mist-400 justify-center flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-5 mt-auto text-white">
        thewritingfiles
      </h2>

      <ul className="mb-auto">
        <li className="text-lg mb-3 w-full">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <FiHome className="mr-3" />
            Home
          </Link>
        </li>

        <li className="text-lg mb-3 w-full">
          <Link
            href="/dashboard/write"
            className={linkClass("/dashboard/write")}
          >
            <CgNotes className="mr-3" />
            Write
          </Link>
        </li>

        <li className="text-lg mb-3 w-full">
          <Link href="/" className={linkClass("/")}>
            <PiSignOutBold className="mr-3" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
