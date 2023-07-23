import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController";
import { isRole, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all",isAuthenticated, isRole('admin'), getAllUsers);

export default router;