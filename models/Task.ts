import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  dueDate: Date,


  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Task ||
  mongoose.model("Task", taskSchema);