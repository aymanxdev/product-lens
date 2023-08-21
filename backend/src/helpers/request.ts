import {  Response, NextFunction, RequestHandler } from "express";
import { IUserRequest } from "../types";

// Type guard to check if a request is an IUserRequest
export const isIUserRequest =(req: IUserRequest): req is IUserRequest =>{
  return (req as IUserRequest).user !== undefined;
}

export function withUserInRequest(handler: (req: IUserRequest, res: Response) => Promise<void>): RequestHandler {
return async (req: IUserRequest, res: Response, next: NextFunction) => {
    if (!isIUserRequest(req)) {
        return res.status(401).json({ error: "Request is not IUserRequest" });
    }
    try {
        await handler(req, res);
        next();
    } catch (err) {
        next(err);
    }
};

}
