import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function POST(req: Request) {
  await connectDB();
  const { name, userId } = await req.json();

  const project = await Project.create({
    name,
    owner: userId,
  });

  return Response.json(project);
}

export async function GET() {
  await connectDB();

  const projects = await Project.find().populate("owner members");

  return Response.json(projects);
}