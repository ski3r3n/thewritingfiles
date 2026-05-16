"use client";
import Sidebar from "@/components/sidebar";
export default function Writings() {
  // TODO: writings content
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Writings</h1>
          <p>
            Welcome to writings! Here you can view your friends&apos; writings and manage your own.
          </p>
        </div>
      </div>
    </>
  );
}
