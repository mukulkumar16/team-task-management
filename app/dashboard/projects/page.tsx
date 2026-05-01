"use client";

import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchProjects();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject} className="bg-black text-white p-2">
        Add Project
      </button>

      <div className="mt-4 space-y-2">
        {projects.map((p: any) => (
          <div key={p._id} className="p-3 bg-white shadow">
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}