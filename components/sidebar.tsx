"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiHome } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";

export default function Sidebar() {
  const pathname = usePathname();
    const linkClass = (href: string) =>
        `flex items-center px-4 py-2 rounded ${
            pathname === href ? "bg-mist-900 text-white" : "text-mist-400 hover:text-white"
        }`;


  return (
    <div className="w-64 h-screen bg-mist-800 text-mist-400 justify-center flex flex-col">
      <h2 className="text-2xl font-bold m-auto mb-5 text-white">
        thewritingfiles
      </h2>

      <ul className="mb-auto">
        <li className="text-lg m-auto mb-5 w-min">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <FiHome className="mr-3" />
            Home
          </Link>
        </li>

        <li className="text-lg m-auto mb-5 w-min">
          <Link
            href="/dashboard/writings"
            className={linkClass("/dashboard/writings")}
          >
            <CgNotes className="mr-3" />
            Writings
          </Link>
        </li>

        <li className="text-lg m-auto mb-5 w-min">
          <Link href="/" className={linkClass("/")}>
            <PiSignOutBold className="mr-3" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}