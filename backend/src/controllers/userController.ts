import User, { IUser } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Handle user registration
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.find({ email });
    if (user.length > 0) {
        return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" , errorMessage: error});
  }
};

// Handle user login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!process.env.ACCESS_TOKEN_SECRET  || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("JWT_SECRET must be defined to sign token");
    }
    const {_id, name, role} = user;

    const accessToken = jwt.sign({ _id, name, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    const refreshToken = jwt.sign({ _id, name, role }, process.env.REFRESH_TOKEN_SECRET);
    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge:  24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(200).json({ message: "Logged in successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error logging in user", errorMessage: error });
  }
};

// Refresh the access token
export const refreshToken = async (req: Request, res: Response) => {
  const { _id } = req.body
  try {
      const user = await User.findById(_id);
      if (!user) {
          return res.status(401).json({ error: "User does not exist" });
      }
      if (!user.refreshToken) {
          return res.status(403).json({ error: "Forbidden: Refresh token does not exist" });
      }

      if(!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET){
          throw new Error("JWT_SECRET must be defined to sign token");
      }
  
      jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET)

      const accessToken = generateAccessToken(user);
      res.cookie("access_token", accessToken, {
          httpOnly: true,
          maxAge:  24 * 60 * 60 * 1000 // 1 day
      });
      res.status(200).json({ message: "Access token refreshed successfully" });

  } catch (error) {
      res.status(500).json({ error: "Error refreshing access token", errorMessage: error });
  }
}

// Generate Access Token
const generateAccessToken = (user: IUser) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("JWT_SECRET must be defined to sign token");
  }
  return jwt.sign({ _id: user._id, name: user.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
}

// Handle user logout
export const logoutUser = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ error: "Logout: User does not exist" });
    }

    //remove refresh token from user
    user.refreshToken = "";
    await user.save();

    //remove access token from cookies
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user", errorMessage: error });
  }
}

// Handle getting all users
export const getAllUsers = async (req: Request,res: Response) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Error getting users", errorMessage: error });
    }
    }
