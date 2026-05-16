"use client";
export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-2">
        <div className="flex flex-col bg-mist-800 p-6 rounded">
          <h1 className=" text-3xl mb-0.5 font-bold w-max">thewritingfiles</h1>
          <h2 className="text-xl text-gray-400">
            Study gc lol, who let him cook
          </h2>
          <a href="/login" className="self-center h-min">
            <button className="mt-4 bg-mist-900 hover:bg-slate-950 active:bg-mist-900 transition cursor-pointer text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
