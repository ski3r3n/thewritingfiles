"use client";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function signInWithEmail(email: string, password: string) {
  console.log("Signing in with email:", email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log("Sign-in response:", { data, error });
  // Handle the response as needed, e.g., redirect on success or show error message
  if (error) {
    alert("Error signing in: " + error.message);
  } else {
    window.location.href = "/dashboard"; // Redirect to dashboard on successful login
  }
}

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
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              signInWithEmail(email, password);
            }}
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              name="password"
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
