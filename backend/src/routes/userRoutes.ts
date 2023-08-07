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
} from "../controllers/userController";
import { isRole, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for refreshing authentication token
router.post("/refresh-token", refreshToken);

// Route for logging out
router.post("/logout", logoutUser);

// Route to get all users (Admin Only)
router.get("/users/all", isAuthenticated, isRole("admin"), getAllUsers);

// Route for searching users by query
router.get("/search", isAuthenticated, searchUsers); // Removed "?q=" from the path since query parameters are not defined in the route itself.

// Route for sending a friend invitation
router.post("/:id/invitations", isAuthenticated, sendFriendInvitation);

// Route for accepting a friend invitation
router.post("/:id/invitations/accept", isAuthenticated, acceptFriendInvitation); // Modified path to differentiate from reject route.

// Route for rejecting a friend invitation
router.post("/:id/invitations/reject", isAuthenticated, rejectFriendInvitation); // Modified path to differentiate from accept route.

// Route for deleting a friend
router.delete("/:friendId", isAuthenticated, deleteFriend);

export default router;
