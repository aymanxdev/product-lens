import { Router } from "express";
import {
  addTicket,
  addCommentToTicket,
  addReplyToComment,
  deleteTicket,
  getUserTickets,
  getCommentsForTicket,
  getCommentById,
  updateTicket,
} from "../controllers/ticketController";
import { isAuthenticated } from "../middleware/authMiddleware";
import { validateCommentId, validateTicketId } from "../middleware/validationMiddleware";

const router = Router();

/** GET */
// Route to get all tickets for a user
router.get("/tickets/:userId", isAuthenticated, getUserTickets);

// Route to get all comments for a ticket
router.get("/:ticketId/comments", isAuthenticated, validateTicketId, getCommentsForTicket);

// Route to get a comment by ID
router.get("/comments/:commentId", isAuthenticated, validateCommentId, getCommentById);

/** POST */
// Route for creating a new ticket
router.post("/tickets", isAuthenticated, addTicket);

// Route for adding a comment to a ticket
router.post("/:ticketId/comments", isAuthenticated, validateTicketId, addCommentToTicket);

// Route for adding a reply to a comment on a ticket
router.post("/:ticketId/comments/:commentId/replies", isAuthenticated, validateTicketId, validateCommentId, addReplyToComment);

/** PATCH */
// Route for updating a ticket
router.patch("/:ticketId", isAuthenticated, validateTicketId, updateTicket);

/** DELETE */
// Route for deleting a ticket
router.delete("/:ticketId", isAuthenticated, validateTicketId, deleteTicket);

export default router;