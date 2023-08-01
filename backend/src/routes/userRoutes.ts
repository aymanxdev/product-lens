import { Router } from "express";
import { registerUser, loginUser, refreshToken, logoutUser, getAllUsers, searchUsers, sendFriendInvitation, acceptFriendInvitation, rejectFriendInvitation, deleteFriend } from "../controllers/userController";
import { isRole, isAuthenticated } from "../middleware/authMiddleware";
import { deleteFeedback } from "../controllers/feedbackController";

const router = Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.get("/users/all",isAuthenticated, isRole('admin'), getAllUsers);
router.get('/search?q=', isAuthenticated, searchUsers)
router.post('/:id/invitations', isAuthenticated, sendFriendInvitation)
router.post('/:id/invitations', isAuthenticated, acceptFriendInvitation)
router.post('/:id/invitations', isAuthenticated, rejectFriendInvitation)
router.delete('/:friendId/friends', isAuthenticated, deleteFriend)

//Feedback routes
router.delete('/:feedbackId', isAuthenticated, deleteFeedback)

export default router;