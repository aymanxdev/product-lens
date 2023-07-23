import User from "../models/userModel";
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
    const user = await User.find({ email });
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined to sign token");
    }
    const {_id, name, role} = user[0];
    const token = jwt.sign({ _id, name, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user", errorMessage: error });
  }
};

// Handle getting all users
export const getAllUsers = async (req: Request,res: Response) => {
    try {
        const users = await User.find({}).select("-password");
        console.log(users);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Error getting users", errorMessage: error });
    }
    }
