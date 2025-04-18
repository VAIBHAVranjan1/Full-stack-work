import bcrypt from "bcrypt";
import { getEntry, addEntry, whetherUserExists } from "../database.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, user_name, password, img } = req.body;
    const userExists = await whetherUserExists(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await addEntry(email, user_name, password, img);

    res.status(201).json({ message: result });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getEntry(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({id: user.id}, "jwtkey");

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ message: "Login successful" });    

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite: "none",
    secure: true,
  }).status(200).json("User has been logged out")
};
