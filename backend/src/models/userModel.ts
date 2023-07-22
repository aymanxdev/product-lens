import mongoose from "mongoose";

enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
  moderator = "moderator",
  editor = "editor",
  manager = "manager",
}
interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user", "guest", "moderator", "editor", "manager"],
    default: "user",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
