import { Router } from "express";
import {
  addTicket,
  addCommentToTicket,
  addReplyToComment,
  changeTicketStatus,
  upvoteTicket,
  deleteTicket,
} from "../controllers/ticketController";
import { isAuthenticated } from "../middleware/authMiddleware";
import { validateCommentId, validateTicketId } from "../middleware/validationMiddleware";

const router = Router();

// Base route for creating a new ticket
router.post("/tickets", isAuthenticated, addTicket);

// Route to change the status of a ticket (e.g., todo, in progress, done)
router.patch("/:ticketId/status", isAuthenticated, validateTicketId, changeTicketStatus);

// Route for adding a comment to a ticket
router.post("/:ticketId/comments", isAuthenticated, validateTicketId, addCommentToTicket);

// Route for adding a reply to a comment on a ticket
router.post("/:ticketId/comments/:commentId/replies", isAuthenticated, validateTicketId, validateCommentId, addReplyToComment);

// Route for upvoting a ticket
router.patch("/:ticketId/vote", isAuthenticated, validateTicketId, upvoteTicket);

// Route for deleting a ticket
router.delete("/:ticketId", isAuthenticated, validateTicketId, deleteTicket);
