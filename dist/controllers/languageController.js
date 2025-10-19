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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchlanguage = exports.deletelang = exports.getalllang = exports.updateLanguage = exports.createLanguage = void 0;
const languageModel_1 = require("../models/languageModel"); // adjust the path
const mongodb_1 = require("mongodb");
const createLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language_name, status } = req.body;
        // Validate language_name
        if (!language_name || typeof language_name !== "string") {
            return res.status(400).json({ message: "language_name is required and must be a string" });
        }
        // Get collection
        const languageCollection = yield (0, languageModel_1.languageCreate)();
        // Prepare data
        const newLanguage = {
            language_name,
            status: status !== null && status !== void 0 ? status : true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Insert to DB
        const result = yield languageCollection.insertOne(newLanguage);
        // Respond to client
        if (result.insertedId) {
            return res.status(200).json({
                status: "created",
                message: "Language created successfully",
                lan_id: result.insertedId,
            });
        }
        else {
            return res.status(400).json({
                status: "failed",
                message: "Language not created",
            });
        }
    }
    catch (err) {
        console.error("Create language error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createLanguage = createLanguage;
const updateLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid language ID" });
        }
        const languageCollection = yield (0, languageModel_1.languageCreate)();
        const result = yield languageCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: Object.assign(Object.assign({}, updatedFields), { updatedAt: new Date() })
        });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Language not found or data is unchanged" });
        }
        return res.status(200).json({
            status: "updated",
            message: "Language updated successfully",
            updatedId: id
        });
    }
    catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateLanguage = updateLanguage;
const getalllang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getalllanguage = yield (0, languageModel_1.languageCreate)();
        const getallresult = yield getalllanguage.find().sort({ createdAt: -1 }).toArray();
        return res.status(200).json({
            message: "list all language",
            data: getallresult
        });
    }
    catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Internal server error", err });
    }
});
exports.getalllang = getalllang;
const deletelang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteobj = yield (0, languageModel_1.languageCreate)();
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const deleteResult = yield deleteobj.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (deleteResult.deletedCount === 0) {
            console.log("Nothing deleted");
            return res.status(404).json({ message: "Item not found or already deleted" });
        }
        return res.status(200).json({
            status: "deleted",
            message: "Language deleted successfully",
        });
    }
    catch (err) {
        console.error("Delete Err.", err);
        return res.status(500).json({ message: "Internal Error" });
    }
});
exports.deletelang = deletelang;
const fetchlanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchobj = yield (0, languageModel_1.languageCreate)();
        const language = yield fetchobj.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!language) {
            return res.status(404).json({ message: "Language not found" });
        }
        // ✅ Return response
        res.status(200).json({
            message: "Language fetched successfully",
            data: language,
        });
    }
    catch (err) {
        console.error("Delete Err.", err);
        return res.status(500).json({ message: "Internal Error" });
    }
});
exports.fetchlanguage = fetchlanguage;
