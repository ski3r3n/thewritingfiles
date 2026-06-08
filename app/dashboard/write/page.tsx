"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function addWriting(title: string, content: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("Writing")
    .insert([{ user_id: user?.id, title: title, data: content }]);
  console.log("Add writing response:", { data, error });
  if (error) {
    alert("Error saving writing: " + error.message);
    return error;
  }

  alert("Writing saved successfully!");
  window.location.href = "/dashboard";
  return null;
}

export default function Write() {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaving && content.trim().length > 0) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved text. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content, isSaving]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (isSaving || content.trim().length === 0) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) {
        return;
      }

      const href = anchor.getAttribute("href") || "";
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const shouldLeave = window.confirm(
        "You have unsaved text. Are you sure you want to leave this page?",
      );
      if (!shouldLeave) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [content, isSaving]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 overflow-y-auto h-screen">
          <h1 className="text-3xl font-bold mb-4">Write</h1>
          <p>Go make some peak. I&apos;m waiting.</p>
          <form
            className="mt-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSaving(true);
              const title = (
                document.getElementById("title") as HTMLInputElement
              ).value;
              const error = await addWriting(title, content);
              if (error) {
                setIsSaving(false);
              }
            }}
          >
            <input
              type="text"
              id="title"
              className="text-2xl mb-4 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Title"
            />
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Some absolute peak?"
            />
            <button className="mt-4 bg-mist-800 hover:bg-mist-950 active:bg-mist-800 transition cursor-pointer text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
