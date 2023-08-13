import { Router } from "express";
import {
  addTicket,
  addCommentToTicket,
  addReplyToComment,
  changeTicketStatus,
  upvoteTicket,
  deleteTicket,
  getUserTickets,
} from "../controllers/ticketController";
import { isAuthenticated } from "../middleware/authMiddleware";
import { validateCommentId, validateTicketId } from "../middleware/validationMiddleware";

const router = Router();

/** GET */
// Route to get all tickets for a user
router.get("/tickets/:userId", isAuthenticated, getUserTickets);

/** POST */
// Route for creating a new ticket
router.post("/tickets", isAuthenticated, addTicket);

// Route for adding a comment to a ticket
router.post("/:ticketId/comments", isAuthenticated, validateTicketId, addCommentToTicket);

// Route for adding a reply to a comment on a ticket
router.post("/:ticketId/comments/:commentId/replies", isAuthenticated, validateTicketId, validateCommentId, addReplyToComment);

/** PATCH */
// Route for upvoting a ticket
router.patch("/:ticketId", isAuthenticated, validateTicketId, upvoteTicket);

// Route to change the status of a ticket (e.g., todo, in progress, done)
router.patch("/:ticketId", isAuthenticated, validateTicketId, changeTicketStatus);

/** DELETE */
// Route for deleting a ticket
router.delete("/:ticketId", isAuthenticated, validateTicketId, deleteTicket);

export default router;