import {  Response } from "express";
import { IUserRequest } from "../types";
import Feedback, { IFeedback } from "../models/feedbackModel";
import User from "../models/userModel";
import {  withUserInRequest } from "../helpers/request";

const getUserFeedbacksHandler = async (
  req: IUserRequest,
  res: Response
): Promise<any> => {
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

const addFeedbackHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { title, category, detail, tags } = req.body;

  const feedback = new Feedback({ title, category, detail, tags, userId: req.user._id });
  try {
    await feedback.save();
    res.status(200).json({ message: "Feedback added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding feedback", errorMessage: error });
  }
};

const editFeedbackHandler = async ( req: IUserRequest, res: Response): Promise<void> => {

  const { title, category, description, tags } = req.body;
  const feedback: IFeedback | null = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404).json({ error: "Feedback not found" });
    return;
  }

  if (feedback.userId !== req.user._id) {
    res.status(403).json({ error: "Not authorized to edit this feedback" });
    return;
  }

  try {
    feedback.title = title;
    feedback.category = category;
    feedback.description = description;
    feedback.tags = tags;
    await feedback.save();
    res.status(200).json({ message: "Feedback edited successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error editing feedback", errorMessage: error });
  }
  return;

}

const deleteFeedbackHandler = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const feedback: IFeedback | null = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ error: "Feedback not found" });
      return;
    }

    if (feedback.userId !== req.user._id) {
      res.status(403).json({ error: "Not authorized to delete this feedback" });
      return;
    }

    await Feedback.deleteOne({ _id: feedback._id });
    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting feedback", errorMessage: error });
  }
  return; 
};

export const deleteFeedback = withUserInRequest(deleteFeedbackHandler);
export const addFeedback = withUserInRequest(addFeedbackHandler);
export const getUserFeedbacks = withUserInRequest(getUserFeedbacksHandler);
export const editFeedback = withUserInRequest(editFeedbackHandler);
