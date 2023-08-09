import { Response } from "express";
import { IUserRequest } from "../types";
import Ticket, { ITicket } from "../models/ticketModel";
import User from "../models/userModel";
import Comment from '../models/commentModel';
import { withUserInRequest } from "../helpers/request";
const getUserTicketsHandler = async ( req: IUserRequest, res: Response ): Promise<any> => {
  const { userId } = req.params;
  const userIdFromToken = req.user?._id;

  if (userId !== userIdFromToken) {
    return res.status(400).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findById(req.user._id).populate("friends");
    const tickets = await Ticket.find({
      userId: { $in: [...(user?.friends || []), req.user?._id] },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting tickets", errorMessage: error });
  }
};

const addTicketHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const { title, category, detail, tags } = req.body;

  const ticket = new Ticket({
    title,
    category,
    detail,
    tags,
    userId: req.user._id,
  });
  try {
    await ticket.save();
    res.status(200).json({ message: "Ticket added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding ticket", errorMessage: error });
  }
};

const changeTicketStatusHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const { ticketId, newStatus } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (ticket.userId !== req.user._id) {
      res.status(403).json({ error: "Not authorized to change this ticket" });
      return;
    }

    ticket.status = newStatus;
    await ticket.save();
    res.status(200).json({ message: "Ticket status changed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error changing ticket status", errorMessage: error });
  }
};

const upvoteTicketHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const { ticketId } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (ticket.upVotedBy.includes(req.user._id)) {
      res.status(403).json({ error: "Already up voted this ticket" });
      return;
    }

    ticket.upVotedBy.push(req.user._id);
    await ticket.save();
    res.status(200).json({ message: "Ticket up voted" });

  } catch (error) {
    res.status(500).json({ error: "Error up voting ticket", errorMessage: error });
  }
};

const addCommentToTicketHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const {ticketId, commentText} = req.body;
  
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    const newComment = new Comment({text: commentText, user: req.user._id}) 
    await newComment.save();

    ticket.comments.push(newComment._id);
    await ticket.save();
    
    res.status(200).json({ message: "Comment added to ticket" });

  } catch (error) {
    
    res.status(500).json({ error: "Error adding comment to ticket", errorMessage: error });

  }
}

const addReplyToCommentHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const {commentId, replyText} = req.body;

  try {
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    const reply = new Comment({text: replyText, user: req.user._id})
    await reply.save();

    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(200).json({ message: "Reply added to comment" });

  } catch (error) {
    res.status(500).json({ error: "Error adding reply to comment", errorMessage: error });
  }

}

const deleteTicketHandler = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const ticket: ITicket | null = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (ticket.userId !== req.user._id) {
      res.status(403).json({ error: "Not authorized to delete this ticket" });
      return;
    }

    await Ticket.deleteOne({ _id: ticket._id });
    res.status(200).json({ message: "Ticket deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting ticket", errorMessage: error });
  }
  return;
};


export const getUserTickets = withUserInRequest(getUserTicketsHandler);
export const addTicket = withUserInRequest(addTicketHandler);
export const deleteTicket = withUserInRequest(deleteTicketHandler);
export const changeTicketStatus = withUserInRequest(changeTicketStatusHandler);
export const upvoteTicket = withUserInRequest(upvoteTicketHandler);
export const addCommentToTicket = withUserInRequest(addCommentToTicketHandler);
export const addReplyToComment = withUserInRequest(addReplyToCommentHandler);

