"use client";
import Sidebar from "@/components/sidebar";
export default function Write() {
  // TODO: implement proper editor
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 overflow-y-auto h-screen">
          <h1 className="text-3xl font-bold mb-4">Write</h1>
          <p>Go make some peak. I&apos;m waiting.</p>
          <form>
            <div className="mt-6">
              <input
                type="text"
                className="text-2xl mb-4 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Title"
              />
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Some absolute peak?"
              />
              <button className="mt-4 bg-mist-800 hover:bg-mist-950 active:bg-mist-800 transition cursor-pointer text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
