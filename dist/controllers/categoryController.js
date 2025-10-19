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
exports.fetchcategory = exports.listcategory = exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const categoryModel_1 = require("../models/categoryModel");
const mongodb_1 = require("mongodb");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, platform_fee, convenience_fee, createdAt } = req.body;
        const categories = yield (0, categoryModel_1.getCategoryCollection)();
        const cateData = {
            name,
            image,
            platform_fee,
            convenience_fee,
            createdAt: createdAt || new Date(),
            updatedAt: new Date()
        };
        const catresult = yield categories.insertOne(cateData);
        if (catresult) {
            res.status(200).json({
                status: "created",
                message: "Category successfully created",
                cat_id: catresult.insertedId
            });
        }
    }
    catch (err) {
        console.error("Fail", err);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateReq = req.body;
        //console.log(updateReq);
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.json({ message: "Invalid Category Id" });
        }
        const categories = yield (0, categoryModel_1.getCategoryCollection)();
        const result = yield categories.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: Object.assign(Object.assign({}, updateReq), { updatedAt: new Date() })
        });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Category not found or not updated" });
        }
        return res.status(200).json({
            status: "updated",
            message: "Category updated successfully",
            updatedId: id,
        });
    }
    catch (err) {
        console.error("Update Category Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const delCat = yield (0, categoryModel_1.getCategoryCollection)();
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const result = yield delCat.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        //if (result.deletedCount === 0) {
        return res.status(200).json({ message: "Category deleted successfully" });
        // }
    }
    catch (err) {
        console.error("Delete error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCategory = deleteCategory;
const listcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listcategories = yield (0, categoryModel_1.getCategoryCollection)();
        const result = yield listcategories.find().sort({ createdAt: -1 }).toArray();
        return res.status(200).json({
            message: "All list category..",
            data: result
        });
    }
    catch (err) {
        console.error("List error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.listcategory = listcategory;
const fetchcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listcategories = yield (0, categoryModel_1.getCategoryCollection)();
        const fetchData = yield listcategories.findOne({ _id: new mongodb_1.ObjectId(id) });
        return res.status(201).json({
            message: "Successfully fetch data",
            data: fetchData
        });
    }
    catch (err) {
        console.error("Error..", err);
        return res.status(500).json({ message: "Internal error" });
    }
});
exports.fetchcategory = fetchcategory;
