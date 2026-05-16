"use client";
import Sidebar from "@/components/sidebar";
import Card from "@/components/card";
export default function Dashboard() {
  // TODO: fetch and display writings, link to writing. blank as placeholder for now
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 overflow-y-auto h-screen">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>See your own and your friends&apos; writings here!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card title="My Writing 1" description="This is a description of my writing 1." href="/dashboard/1" />
            <Card title="My Writing 2" description="This is a description of my writing 2." href="/dashboard/2" />
            <Card title="Friend's Writing 1" description="This is a description of my friend's writing 1." href="/dashboard/3" />
          </div>
        </div>
      </div>
    </>
  );
}
