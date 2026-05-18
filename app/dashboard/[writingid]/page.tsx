"use client";
import Sidebar from "@/components/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function fetchWriting(writingId: string) {
  const { data, error } = await supabase
    .from("Writing")
    .select("*")
    .eq("id", writingId);

  if (error) {
    console.error("Error fetching writing:", error);
    return null;
  }

  return data;
}
async function deleteWriting(writingId: string) {
  const { error } = await supabase.from("Writing").delete().eq("id", writingId);
  if (error) {
    alert("Error deleting writing: " + error.message);
  } else {
    alert("Writing deleted successfully!");
    window.location.href = "/dashboard"; // Redirect to dashboard on successful deletion
  }
}

export default function Writing() {
  const writingId = useParams().writingid;
  const [writing, setWriting] = useState<{
    user_id: string;
    data: string;
    created_at: string;
    title: string;
    author: string;
  }>();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadWriting() {
      const data = await fetchWriting(writingId?.toString() || "");
      // get user name for the writing
      if (data && data.length > 0) {
        const writing = data[0];
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
        if (mounted && data) {
          console.log(data);
          setWriting(data[0]);
        }
      }
    }

    loadWriting();

    return () => {
      mounted = false;
    };
  }, [writingId]);

  useEffect(() => {
    let mounted = true;
    async function loadCurrentUser() {
      const res = await supabase.auth.getUser();
      const id =
        (res as { data: { user: { id: string } } }).data?.user?.id ?? null;
      if (mounted) setCurrentUserId(id);
    }

    loadCurrentUser();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="overflow-y-auto h-screen p-10">
          <h1 className="text-3xl font-bold mb-4">{writing?.title}</h1>
          <div className="flex gap-4 mb-6">
            <h2 className="text-xl text-gray-400">By: {writing?.author}</h2>
            <h2 className="text-xl text-gray-400">
              Date: {writing?.created_at.slice(0, 10)}
            </h2>
          </div>
          {writing && (
            <p className="text-lg w-full whitespace-pre-wrap">{writing.data}</p>
          )}
          <div>
            {writing && currentUserId && writing.user_id === currentUserId && (
              <button
                onClick={() => deleteWriting(writingId?.toString() || "")}
                className="mt-4 bg-mist-800 hover:bg-mist-950 active:bg-mist-800 transition cursor-pointer text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
