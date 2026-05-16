"use client";
import Sidebar from "@/components/sidebar";
export default function Write() {
  // TODO: implement proper editor
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Write</h1>
          <p>
            Write your thoughts, stories, or ideas here. This is your personal space to create and manage your writings. Whether it&apos;s a journal entry, a short story, or a poem, you can write it all here. Happy writing!
          </p>
          <div className="mt-6">
            <input
              type="text"
              className="text-2xl p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Title"
            />
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Some absolute peak?"
            />
            <button
              className="mt-4 bg-mist-800 hover:bg-mist-950 active:bg-mist-800 transition cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
