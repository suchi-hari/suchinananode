
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import { initUserModel } from "./models/userModel.js";
import { verifyToken } from "./middleware/authMiddleware.js";


dotenv.config({ path: [".env.local", ".env"] });
const app: Application = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


//  ✅ Global token check middleware (except login/register)
// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
//         return next(); // Skip token check for login/register
//     }
//     verifyToken(req, res, next); // For all other routes
// });


// API Routes
app.use("/api/auth", authRoutes);
// Port
const PORT = process.env.PORT || 5000;
// Start server
const startServer = async () => {
    try {
        await initUserModel(); // Connect to DB or initialize collection
        console.log("Users collection initialized");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
};

startServer();