import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./userModel";
import { IComment } from "./commentModel";

export interface ITicket extends Document {
  title: string;
  category: string;
  description: string;
  userId: IUser["_id"];
  tags: string[];
  createdAt: Date;
  modifiedAt: Date;
  status: string;
  comments: IComment["_id"][];
  upVotedBy: IUser["_id"][];
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    status: { type: String, required: true, default: "todo" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    upVotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" },
  }
);

export default mongoose.model<ITicket>("Ticket", ticketSchema);
