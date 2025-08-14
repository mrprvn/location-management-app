import { Router } from "express";
import { createUser, login } from "./userController.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
