import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Route User Present in Routes file");
});

export default router;
