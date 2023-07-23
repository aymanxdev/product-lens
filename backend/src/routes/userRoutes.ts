import { Router } from "express";
import { registerUser, loginUser, refreshToken, getAllUsers } from "../controllers/userController";
import { isRole, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/all",isAuthenticated, isRole('admin'), getAllUsers);

export default router;