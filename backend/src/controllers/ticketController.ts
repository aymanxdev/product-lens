import { Response } from "express";
import Ticket, { ITicket } from "../models/ticketModel";
import User from "../models/userModel";
import Comment from "../models/commentModel";
import { withUserInRequest } from "../helpers/request";
import { IUserRequest } from "../types";
import { deleteItemFrom, isEqual } from "../utils";

const MAX_LIMIT = 50;

const getUserTicketsHandler = async (
  req: IUserRequest,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  const userIdFromToken = req.user?._id.toString();

  // Retrieve the limit and offset from the query parameters
  const limit = Math.min(Number(req.query.limit) || 10, MAX_LIMIT);
  const offset = Number(req.query.offset) || 0; // Default to 0 if not provided

const MAX_LIMIT = 50;

const getUserTicketsHandler = async (
  req: IUserRequest,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  const userIdFromToken = req.user?._id.toString();

  // Retrieve the limit and offset from the query parameters
  const limit = Math.min(Number(req.query.limit) || 10, MAX_LIMIT);
  const offset = Number(req.query.offset) || 0; // Default to 0 if not provided

  if (userId !== userIdFromToken) {
    return res.status(400).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findById(req.user?._id).populate("friends");
    const tickets = await Ticket.find({
      userId: { $in: [...(user?.friends || []), req.user?._id] },
    })
      .limit(limit)
      .skip(offset);

    const totalRecords = await Ticket.countDocuments({
      userId: { $in: [...(user?.friends || []), req.user?._id] },
    });
    const totalPages = Math.ceil(totalRecords / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    res.status(200).json({
      data: tickets,
      meta: {
        totalRecords,
        totalPages,
        currentPage,
        limit,
        offset,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting tickets", errorMessage: error });
  }
};

const addTicketHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { title, description, category, detail, tags } = req.body;

  const ticket = new Ticket({
    title,
    description,
    category,
    detail,
    tags,
    userId: req.user._id,
  });
  try {
    await ticket.save();
    res
      .status(200)
      .json({ message: "Ticket added successfully", _id: ticket._id });
  } catch (error) {
    res.status(500).json({ error: "Error adding ticket", errorMessage: error });
  }
};

// const changeTicketStatusHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
//   const { selectedTicketId, status } = req.body;
//   const { ticketId } = req.params;

//   if (ticketId !== selectedTicketId) {
//     res.status(400).json({ error: "Ticket ID in body does not match ticket ID in params" });
//     return;
//   }

//   try {
//     const ticket = await Ticket.findById(selectedTicketId);

//     if (!ticket) {
//       res.status(404).json({ error: "Ticket not found" });
//       return;
//     }

//     if (ticket.userId !== req.user._id) {
//       res.status(403).json({ error: "Not authorized to change this ticket" });
//       return;
//     }

//     ticket.status = status;
//     await ticket.save();
//     res.status(200).json({ message: "Ticket status changed", _id: ticket._id });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error changing ticket status", errorMessage: error });
//   }
// };

const updateTicketHandler = async ( req: IUserRequest, res: Response ): Promise<void> => {
  const { selectedTicketId, status, action, title, description, commentToDelete } = req.body;
  const { ticketId } = req.params;

  if (ticketId !== selectedTicketId) {
    return sendError(res, 400, "Ticket ID in body does not match ticket ID in params");
  }

  try {
    const ticket = await Ticket.findById(selectedTicketId);
    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    if (!isEqual(ticket.userId, req.user._id)) {
      return sendError(res, 403, "Not authorized to change this ticket");
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (commentToDelete) { ticket.comments = deleteItemFrom(ticket.comments, commentToDelete)}

    switch (action) {
      case "upvote":
        if (ticket.upVotedBy.includes(req.user._id)) {
          return sendError(res, 403, "Already up voted this ticket");
        }
        ticket.upVotedBy.push(req.user._id);
        break;

      case "changeStatus":
        if (!status) {
          return sendError(res, 400, "Status required to change ticket status");
        }
        ticket.status = status;
        break;

      default:
        if (!title && !description && !commentToDelete) {
          return sendError(res, 400, "Invalid action specified or no updates provided");
        }
    }

    await ticket.save();

    res.status(200).json({ message: "Ticket updated", _id: ticket._id });
  } catch (error) {
    sendError(res, 500, "Error updating ticket", error);
  }
};

const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
): void => {
  const responseObject: { error: string; errorMessage?: any } = { error: message };
  if (error) responseObject.errorMessage = error;
  res.status(statusCode).json(responseObject);
};

const addCommentToTicketHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { selectedTicketId, commentText } = req.body;
  const { ticketId } = req.params;

  if (ticketId !== selectedTicketId) {
    res
      .status(400)
      .json({ error: "Ticket ID in body does not match ticket ID in params" });
    return;
  }

  try {
    const ticket = await Ticket.findById(selectedTicketId);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    const newComment = new Comment({ text: commentText, userId: req.user._id });
    await newComment.save();

    ticket.comments.push(newComment._id);
    await ticket.save();

    res.status(200).json({ message: "Comment added to ticket" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding comment to ticket", errorMessage: error });
  }
};

const getCommentsForTicketHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId).populate("comments");
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    res.status(200).json({ comments: ticket.comments });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error getting comments for ticket",
        errorMessage: error,
      });
  }
};

const getCommentByIdHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    res.status(200).json({ comment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting comment by ID", errorMessage: error });
  }
};

const addReplyToCommentHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  const { selectedCommentId, replyText } = req.body;

  const { commentId } = req.params;

  if (commentId !== selectedCommentId) {
    res
      .status(400)
      .json({
        error: "Comment ID in body does not match comment ID in params",
      });
    return;
  }

  try {
    const parentComment = await Comment.findById(selectedCommentId);
    if (!parentComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    const reply = new Comment({ text: replyText, userId: req.user._id });
    await reply.save();

    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(200).json({ message: "Reply added to comment" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding reply to comment", errorMessage: error });
  }
};

const deleteTicketHandler = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const ticket: ITicket | null = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (!isEqual(ticket.userId, req.user._id)) {
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
export const updateTicket = withUserInRequest(updateTicketHandler);
export const addCommentToTicket = withUserInRequest(addCommentToTicketHandler);
export const addReplyToComment = withUserInRequest(addReplyToCommentHandler);
export const getCommentsForTicket = withUserInRequest(getCommentsForTicketHandler);
export const getCommentById = withUserInRequest(getCommentByIdHandler);
