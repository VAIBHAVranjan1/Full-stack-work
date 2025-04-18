import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/auth.js";

router.get("/", (req, res) => {
  res.send("Route Auth Present in Routes file. Use /register, /login, /logout");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
