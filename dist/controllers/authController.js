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
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const Users = (0, userModel_1.getUsersCollection)();
        const user = yield Users.findOne({ email_id: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email_id: user.email_id }, process.env.JWT_SECRET, // force TypeScript to treat it as a string
        { expiresIn: "20h" });
        return res.status(200).json({ message: "Login successfully", token });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { f_name, l_name, email_id, password, employee_type } = req.body;
        const Users = (0, userModel_1.getUsersCollection)();
        const existingUser = yield Users.findOne({ email_id });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = {
            f_name,
            l_name,
            email_id,
            password: hashedPassword,
            employee_type
        };
        const result = yield Users.insertOne(newUser);
        return res.status(201).json({
            status: "created",
            message: "User registered successfully",
            user_id: result.insertedId
        });
    }
    catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.register = register;
