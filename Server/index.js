import express from "express";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
