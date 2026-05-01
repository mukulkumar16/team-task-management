import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) return Response.json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return Response.json({ error: "Invalid credentials" });

  const token = generateToken({ id: user._id, role: user.role });

  return Response.json({
  token,
  user: {
    _id: user._id,
    email: user.email,
    role: user.role,
  },
});
}