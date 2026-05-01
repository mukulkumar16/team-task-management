"use client";

import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, dueDate }),
    });

    setTitle("");
    setDueDate("");
    fetchTasks();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 mr-2"
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        className="border p-2 mr-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <button onClick={createTask} className="bg-black text-white p-2">
        Add Task
      </button>

      <div className="mt-4 space-y-2">
        {tasks.map((t: any) => (
          <div key={t._id} className="p-3 bg-white shadow">
            <p>{t.title}</p>
            <p>Status: {t.status}</p>
            <p>Due: {t.dueDate?.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}