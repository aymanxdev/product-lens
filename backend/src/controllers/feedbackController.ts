import { Request, Response } from "express";
import { IUserRequest } from "../types";
import Feedback from "../models/feedbackModel";
import User, { IUser } from "../models/userModel";

export const getUserFeedbacks = async (req: IUserRequest, res: Response): Promise<any> => {
  const { userId } = req.params;
  const userIdFromToken = req.user?._id;

  if (userId !== userIdFromToken) {
    return res.status(400).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findById(req.user._id).populate("friends");
    const feedbacks = await Feedback.find({
      userId: { $in: [...(user?.friends || []), req.user?._id] },
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting feedbacks", errorMessage: error });
  }
};

export const addFeedback = async (req: IUserRequest, res: Response): Promise<void> => {
    const {title, category, detail, tags} = req.body
    
    const feedback = new Feedback({title, category, detail, tags, userId: req.user._id})
    try {
        await feedback.save()
        res.status(200).json({message: "Feedback added successfully"})
    } catch (error) {
        res.status(500).json({ error: "Error adding feedback", errorMessage: error })
    }
}
