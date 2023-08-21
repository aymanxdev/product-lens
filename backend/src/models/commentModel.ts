import mongoose from "mongoose";
import { IUser } from "./userModel";

export interface IComment extends mongoose.Document {
    text: string
    userId: IUser["_id"]
    replies: IComment["_id"][] 
}

const commentSchema = new mongoose.Schema<IComment>({
    text: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

export default mongoose.model<IComment>("Comment", commentSchema);
