"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const userModel_js_1 = require("./models/userModel.js");
dotenv_1.default.config({ path: [".env.local", ".env"] });
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
//  ✅ Global token check middleware (except login/register)
// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
//         return next(); // Skip token check for login/register
//     }
//     verifyToken(req, res, next); // For all other routes
// });
// API Routes
app.use("/api/auth", authRoutes_js_1.default);
// Port
const PORT = process.env.PORT || 5000;
// Start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userModel_js_1.initUserModel)(); // Connect to DB or initialize collection
        console.log("Users collection initialized");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
});
startServer();
