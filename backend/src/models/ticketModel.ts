import mongoose, {Document, Schema} from "mongoose";
import { IUser } from "./userModel";
import { IComment } from "./commentModel";

export interface ITicket extends Document {
    title: string;
    category: string;
    description: string;
    user: Schema.Types.ObjectId;
    tags: string[];
    createdAt: Date;
    modifiedAt: Date
    userId: IUser["_id"];
    status: string;
    comments: IComment['_id'][];
    votes: number;
    upVotedBy: IUser['_id'][];
}

const ticketSchema = new mongoose.Schema<ITicket>({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    tags: [{type: String}],
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {type: String, required:true},
    votes: {type: Number, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

export default mongoose.model<ITicket>("Ticket", ticketSchema);