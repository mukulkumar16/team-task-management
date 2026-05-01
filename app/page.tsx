"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ If logged in → go dashboard
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      
      {/* HERO */}
      <div className="text-center max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Team Task Management System
        </h1>

        <p className="text-gray-600 mb-6">
          Manage projects, assign tasks, and track progress with role-based access.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-white border px-6 py-2 rounded hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:opacity-90"
          >
            Signup
          </button>

        </div>
      </div>
    </div>
  );
}