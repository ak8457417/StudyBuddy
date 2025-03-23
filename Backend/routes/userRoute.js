import express from "express";
import {signUp, login, getCurrentUser} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get('/getCurrentUser', getCurrentUser);

export default router;