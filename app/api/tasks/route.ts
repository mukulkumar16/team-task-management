import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();

  const tasks = await Task.find().populate("assignedTo", "email");

  return Response.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();

  const { title, status, dueDate, assignedTo } = await req.json();

  const task = await Task.create({
    title,
    status,
    dueDate,
    assignedTo, 
  });

  return Response.json(task);
}