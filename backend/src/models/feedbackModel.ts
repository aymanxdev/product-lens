import mongoose, {Document, Schema} from "mongoose";

export interface IFeedback extends Document {
    title: string;
    category: string;
    description: string;
    user: Schema.Types.ObjectId;
    tags: string[];
    createdAt: Date;
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    tags: [{type: String}],
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);