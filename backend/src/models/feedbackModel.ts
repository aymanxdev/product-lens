import mongoose, {Document, Schema} from "mongoose";
import { IUser } from "./userModel";

export interface IFeedback extends Document {
    title: string;
    category: string;
    description: string;
    user: Schema.Types.ObjectId;
    tags: string[];
    createdAt: Date;
    modifiedAt: Date
    userId: IUser["_id"];
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    tags: [{type: String}],
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback