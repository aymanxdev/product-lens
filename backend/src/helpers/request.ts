import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUserRequest } from "../types";

// Type guard to check if a request is an IUserRequest
export const isIUserRequest =(req: Request): req is IUserRequest =>{
  return (req as IUserRequest).user !== undefined;
}

export function withUserInRequest(handler: (req: IUserRequest, res: Response) => Promise<void>): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isIUserRequest(req)) {
      return res.status(401).json({ error: "Request is not IUserRequest" });
    }
    return handler(req, res);
  };
}
