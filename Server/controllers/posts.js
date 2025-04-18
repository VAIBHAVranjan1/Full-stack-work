import { pool } from "../database.js";
import jwt from "jsonwebtoken";
export const getPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT * FROM posts ORDER BY date DESC"
    );    
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.user_name, u.email, p.id, p.img, p.title, p.date, p.desc 
       FROM users u 
       JOIN posts p ON u.id = p.userId 
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid");

    try {
      const postId = req.params.id;

      const [result] = await pool.query("DELETE FROM posts WHERE id = ? AND userId = ?",[postId, userInfo.id]);

      if (result.affectedRows > 0) {
        return res.status(200).json("The post has been deleted");
      } else {
        return res.status(403).json("You can delete only your post!");
      }
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });
};


export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid");

    const { title, desc, img } = req.body;

    if (!title || !desc) {
      return res.status(400).json("Title and description are required");
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO posts (title, `desc`, img, userId, date) VALUES (?, ?, ?, ?, ?)',
        [title, desc, img || null, userInfo.id, new Date()]
      );

      res.status(201).json({ message: "Post created", postId: result.insertId });
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json("Server error");
    }
  });
};

export const updatePost = () => {
  res.send("Hello world");
}