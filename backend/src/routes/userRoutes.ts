import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all",isAuthenticated, isAdmin, getAllUsers);

export default router;