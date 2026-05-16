"use client";
export default function Login() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center min-h-screen py-2">
        <div className="bg-mist-800 p-6 rounded">
          <h1 className="text-3xl mb-0.5 font-bold w-max">Login</h1>
          <h2 className="text-xl text-gray-400">
            What are we about to cook today twin?
          </h2>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard"; // placeholder
            }}
          >
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="w-full bg-mist-900 hover:bg-slate-950 active:bg-mist-900 transition cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
