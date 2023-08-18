import mongoose, { Document, Schema } from "mongoose";

enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
  moderator = "moderator",
  editor = "editor",
  manager = "manager",
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  friends: IUser["_id"][];
  invitations: IUser["_id"][];
  role?: Role;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true , index: "text"},
  email: { type: String, required: true, unique: true, index: "text"  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [Role],
    default: "user",
  },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitations: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Adding indexes
userSchema.index({ name: "text", email: "text" });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
