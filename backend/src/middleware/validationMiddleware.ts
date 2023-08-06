import {Request, Response,  NextFunction } from "express";
import Ticket from "../models/ticketModel";

export const validateTicketId = async (req: Request, res: Response, next: NextFunction) => {

    const {ticketId} = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
    }
    next();
}