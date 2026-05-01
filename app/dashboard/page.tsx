"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  role: "ADMIN" | "USER";
};

type Task = {
  _id: string;
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
  assignedTo?: User;
};

type Project = {
  _id: string;
  name: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState<Task["status"]>("PENDING");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      window.location.href = "/login";
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const fetchData = async () => {
    const [taskRes, userRes, projectRes] = await Promise.all([
      fetch("/api/tasks"),
      fetch("/api/users"),
      fetch("/api/projects"),
    ]);

    setTasks(await taskRes.json());
    setUsers(await userRes.json());
    setProjects(await projectRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);


  const createProject = async () => {
    if (!projectName) return alert("Project name required");

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: projectName }),
    });

    setProjectName("");
    fetchData();
  };

  const createTask = async () => {
    if (!title) return alert("Title required");

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        status,
        dueDate,
        assignedTo,
      }),
    });

    setTitle("");
    setDueDate("");
    setAssignedTo("");
    fetchData();
  };


  const updateStatus = async (id: string, status: Task["status"]) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  if (!currentUser) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard ({currentUser.role})
      </h1>

   
      {currentUser.role === "ADMIN" && (
        <div className="grid md:grid-cols-2 gap-6">
      
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Create Project</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <button
              onClick={createProject}
              className="bg-blue-600 text-white px-4 py-2 w-full"
            >
              + Add Project
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Create Task</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 w-full mb-2"
              onChange={(e) => setDueDate(e.target.value)}
            />

            <select
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setStatus(e.target.value as Task["status"])
              }
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <select
              className="border p-2 w-full mb-2"
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assign User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.email}
                </option>
              ))}
            </select>

            <button
              onClick={createTask}
              className="bg-black text-white px-4 py-2 w-full"
            >
              + Add Task
            </button>
          </div>
        </div>
      )}

      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Projects</h2>
        <div className="flex flex-wrap gap-2">
          {projects.map((p) => (
            <span
              key={p._id}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map((t) => {
          const isOwner =
            t.assignedTo?._id === currentUser._id;

          return (
            <div
              key={t._id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-bold">{t.title}</h3>
              <p>Status: {t.status}</p>
              <p>Due: {t.dueDate?.slice(0, 10)}</p>
              <p>
                Assigned: {t.assignedTo?.email || "None"}
              </p>

              {isOwner && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(t._id, "IN_PROGRESS")
                    }
                    className="bg-yellow-500 px-2 py-1 text-white"
                  >
                    Start
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(t._id, "DONE")
                    }
                    className="bg-green-600 px-2 py-1 text-white"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}