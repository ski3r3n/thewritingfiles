"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiHome } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Error signing out: " + error.message);
  } else {
    alert("Successfully signed out!");
    window.location.href = "/"; // Redirect to login page on successful logout
  }
}
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
          <button
            onClick={signOut}
            className="flex items-center px-4 py-2 rounded w-full text-mist-400 hover:text-white cursor-pointer"
          >
            <PiSignOutBold className="mr-3" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
