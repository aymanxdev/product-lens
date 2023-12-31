import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getAllUsers,
  searchUsers,
  sendFriendInvitation,
  acceptFriendInvitation,
  rejectFriendInvitation,
  deleteFriend,
  getMe, 
  getUserById
} from "../controllers/userController";
import { isRole, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

// Route to get all users (Admin Only)
router.get("/users/all", isAuthenticated, isRole("admin"), getAllUsers);

// Route for searching users by query
router.get("/search", isAuthenticated, searchUsers); 

// Route to get current user
router.get("/me", isAuthenticated, getMe);

// Route to get user by ID
router.get("/users/:id", isAuthenticated, getUserById);

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for refreshing authentication token
router.post("/refresh-token", refreshToken);

// Route for logging out
router.post("/logout", logoutUser);

// Route for sending a friend invitation
router.post("/:id/invitations", isAuthenticated, sendFriendInvitation);

// Route for accepting a friend invitation
router.post("/:id/invitations/accept", isAuthenticated, acceptFriendInvitation); 

// Route for rejecting a friend invitation
router.post("/:id/invitations/reject", isAuthenticated, rejectFriendInvitation); 

// Route for deleting a friend
router.patch("/:friendId", isAuthenticated, deleteFriend);

export default router;
