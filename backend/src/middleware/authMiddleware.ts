import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";import User, { IUser } from "../models/userModel";
import { IUserRequest } from "../types";

// Middleware to check if user is authenticated
export const isAuthenticated = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
    
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET must be defined to verify token");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as IUser;
    req.user = await User.findById(decoded._id).select('-password') 
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", errorMessage: error });
  }
};

// Middleware to check if user is admin
export const isRole = (userRole: string) => {
  return async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error(
          `Failed to get user from request to check ${userRole} role`
        );
      }
      const user = await User.findById(req.user._id);
      if (user && user.role === userRole) {
        next();
      } else {
        res
          .status(401)
          .json({ error: "Unauthorized access: User is not an admin" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error checking user role", errorMessage: error });
    }
  };
};
