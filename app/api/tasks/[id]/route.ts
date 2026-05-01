import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function PUT(req: Request, { params }: any) {
  await connectDB();

  const { status } = await req.json();

  const updated = await Task.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return Response.json(updated);
}