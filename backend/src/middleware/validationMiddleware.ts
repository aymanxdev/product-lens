import {Request, Response,  NextFunction } from "express";
import Ticket from "../models/ticketModel";
import  Comment  from "../models/commentModel";

export const validateTicketId = async (req: Request, res: Response, next: NextFunction) => {

    const {ticketId} = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
    }
    next();
}


export const validateCommentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        
        // req.comment = comment

        next();
    } catch (error) {
        res.status(500).json({ error: "Failed to validate comment." });
    }
};