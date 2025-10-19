import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        // ✅ Fix here: cast JWT_SECRET to string
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        //console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};
