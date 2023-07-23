import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

type IUserPayload = Omit<IUser, "password">;
interface IUserRequest extends Request {
  user?: IUserPayload;
}

const isUserPayloadGuard = (object: any): object is IUserPayload => {
    return 'name' in object && 'email' in object && 'role' in object && '_id' in object;

};

// Middleware to check if user is authenticated
export const isAuthenticated = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined to verify token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUser;

    // if (!isUserPayloadGuard(decoded)) {
    //     console.log("Invalid token payload");
    //   throw new Error("Invalid token payload");
    // }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", errorMessage: error });
  }
};

// Middleware to check if user is admin
export const isAdmin = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("Failed to get user from request to check Admin role");
    }
    const user = await User.findById(req.user._id);
    if (user && user.role === "admin") {
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
