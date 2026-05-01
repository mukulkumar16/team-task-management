"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "token=; Max-Age=0";
    router.push("/login");
  };

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="font-bold">Task Manager</h1>

      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/tasks">Tasks</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}