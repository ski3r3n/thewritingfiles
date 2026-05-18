"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Card from "@/components/card";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function fetchWritings() {
  const { data, error } = await supabase.from("Writing").select("*");
  if (error) {
    console.error("Error fetching writings:", error);
    return [];
  }
  return data;
}

export default function Dashboard() {
  const [writings, setWritings] = useState<
    {
      id: string;
      created_at: string;
      title: string;
      author: string;
    }[]
  >([]);

  useEffect(() => {
    let mounted = true;

    async function loadWritings() {
      const data = await fetchWritings();
      // get user name for each writing
      for (const writing of data) {
        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("username")
          .eq("id", writing.user_id);
        if (userData && userData.length > 0) {
          writing.author = userData[0].username;
        }
        if (userError) {
          console.error("Error fetching user data:", userError);
        }
      }

      console.log("Fetched writings:", data);
      if (mounted && Array.isArray(data)) {
        setWritings(
          data as {
            id: string;
            created_at: string;
            title: string;
            author: string;
          }[],
        );
      }
    }

    loadWritings();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 overflow-y-auto h-screen">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>See your own and your friends&apos; writings here!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {writings.map((writing) => (
              <Card
                key={writing.id}
                title={writing.title}
                author={writing.author}
                date={writing.created_at.slice(0, 10)}
                href={`/dashboard/${writing.id}`}
              />
            ))}
          </div>
          <Link
            className=" mt-4 rounded-lg p-4 flex items-center justify-center bg-mist-800"
            href="/dashboard/write"
          >
            + Create New Writing
          </Link>
        </div>
      </div>
    </>
  );
}
