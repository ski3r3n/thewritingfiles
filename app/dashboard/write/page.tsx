"use client";
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
  } else {
    alert("Writing saved successfully!");
    window.location.href = "/dashboard";
  }
}
export default function Write() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 overflow-y-auto h-screen">
          <h1 className="text-3xl font-bold mb-4">Write</h1>
          <p>Go make some peak. I&apos;m waiting.</p>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(
                "Title:",
                (document.getElementById("title") as HTMLInputElement).value,
              );
              console.log(
                "Content:",
                (document.getElementById("content") as HTMLTextAreaElement)
                  .value,
              );
              addWriting(
                (document.getElementById("title") as HTMLInputElement).value,
                (document.getElementById("content") as HTMLTextAreaElement)
                  .value,
              );
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
