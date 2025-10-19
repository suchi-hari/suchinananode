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
exports.fetchsocialData = exports.updatesociallink = exports.deletesocalilLink = exports.listsocialdata = exports.addsociallink = void 0;
const sociallinksModel_1 = require("../models/sociallinksModel");
const mongodb_1 = require("mongodb");
const addsociallink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { facebook, instagram, twitter, youtube, status, whatsapp_number, rating_link } = req.body;
        // Basic validation (optional, but good to have)
        if (!facebook && !instagram && !twitter && !youtube) {
            return res.status(400).json({
                status: "failed",
                message: "At least one social media link is required"
            });
        }
        const socialCollection = yield (0, sociallinksModel_1.sociallinkClass)();
        const socialData = {
            facebook: facebook || "",
            instagram: instagram || "",
            twitter: twitter || "",
            youtube: youtube || "",
            status: status !== null && status !== void 0 ? status : true,
            whatsapp_number: whatsapp_number || "",
            rating_link: rating_link || "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = yield socialCollection.insertOne(socialData);
        if (result.insertedId) {
            return res.status(201).json({
                status: "added",
                message: "Social link added successfully",
                id: result.insertedId
            });
        }
        else {
            return res.status(400).json({
                status: "failed",
                message: "Social link not added"
            });
        }
    }
    catch (err) {
        console.error("Add social link error:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});
exports.addsociallink = addsociallink;
const listsocialdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listallsocialData = yield (0, sociallinksModel_1.sociallinkClass)();
        const listsocialDataarray = yield listallsocialData.find().sort({ createdAt: -1 }).toArray();
        if (listsocialDataarray) {
            return res.status(200).json({
                status: "success",
                message: "Listing all data",
                data: listsocialDataarray
            });
        }
    }
    catch (err) {
        console.error("Err", err);
        return res.status(500).json({ message: "Error" });
    }
});
exports.listsocialdata = listsocialdata;
const deletesocalilLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listallsocialData = yield (0, sociallinksModel_1.sociallinkClass)();
        const deleteData = yield listallsocialData.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        //console.log(deleteData);
        if (deleteData.deletedCount === 0) {
            console.log("Nothing deleted");
            return res.status(404).json({ message: "Item not found or already deleted" });
        }
        return res.status(200).json({
            status: "deleted",
            message: "Sociallink deleted successfully",
        });
    }
    catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Internal Error" });
    }
});
exports.deletesocalilLink = deletesocalilLink;
const updatesociallink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const udpateData = req.body;
        const listallsocialData = yield (0, sociallinksModel_1.sociallinkClass)();
        const result = yield listallsocialData.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: Object.assign(Object.assign({}, udpateData), { updatedAt: new Date() })
        });
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Social link data not update" });
        }
        return res.status(200).json({ status: "success", message: "Social link updated successfully" });
    }
    catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Error" });
    }
});
exports.updatesociallink = updatesociallink;
const fetchsocialData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listallsocialData = yield (0, sociallinksModel_1.sociallinkClass)();
        const fetchData = yield listallsocialData.findOne({ _id: new mongodb_1.ObjectId(id) }, { projection: { facebook: 1, instagram: 1, youtube: 1, whatsapp_number: 1, rating_link: 1, status: 1, _id: 1 } });
        if (!fetchData) {
            return res.status(404).json({ message: "Social data not found" });
        }
        return res.status(200).json({
            status: "success",
            data: fetchData,
        });
    }
    catch (err) {
        console.error("Error fetching language by ID:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchsocialData = fetchsocialData;
