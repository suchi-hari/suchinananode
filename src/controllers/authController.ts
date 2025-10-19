import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsersCollection } from '../models/userModel';
import dotenv from "dotenv";
dotenv.config();

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const Users = getUsersCollection();
        const user = await Users.findOne({ email_id: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, email_id: user.email_id },
            process.env.JWT_SECRET as string, // force TypeScript to treat it as a string
            { expiresIn: "20h" }
        );
        return res.status(200).json({ message: "Login successfully", token });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { f_name, l_name, email_id, password, employee_type } = req.body;
        const Users = getUsersCollection();
        const existingUser = await Users.findOne({ email_id });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            f_name,
            l_name,
            email_id,
            password: hashedPassword,
            employee_type
        };
        const result = await Users.insertOne(newUser);
        return res.status(201).json({
            status: "created",
            message: "User registered successfully",
            user_id: result.insertedId
        });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
