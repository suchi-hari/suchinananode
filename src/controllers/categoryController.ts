import { Request, Response } from "express";
import { getCategoryCollection } from "../models/categoryModel";
import { ObjectId } from "mongodb";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, image, platform_fee, convenience_fee, createdAt } = req.body;
        const categories = await getCategoryCollection();
        const cateData = {
            name,
            image,
            platform_fee,
            convenience_fee,
            createdAt: createdAt || new Date(),
            updatedAt: new Date()
        };
        const catresult = await categories.insertOne(cateData);
        if (catresult) {
            res.status(200).json({
                status: "created",
                message: "Category successfully created",
                cat_id: catresult.insertedId
            });
        }
    } catch (err) {
        console.error("Fail", err);
    }
};


export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateReq = req.body;
        console.log(updateReq);
        if (!ObjectId.isValid(id)) {
            return res.json({ message: "Invalid Category Id" });
        }
        const categories = await getCategoryCollection();
        const result = await categories.updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    ...updateReq,
                    updatedAt: new Date()
                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Category not found or not updated" });
        }
        return res.status(200).json({
            status: "updated",
            message: "Category updated successfully",
            updatedId: id,
        });
    } catch (err) {
        console.error("Update Category Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const delCat = await getCategoryCollection();
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const result = await delCat.deleteOne({ _id: new ObjectId(id) });
        //if (result.deletedCount === 0) {
        return res.status(200).json({ message: "Category deleted successfully" });
        // }
    } catch (err) {
        console.error("Delete error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const listcategory = async (req: Request, res: Response) => {
    try {
        const listcategories = await getCategoryCollection();
        const result = await listcategories.find().sort({ createdAt: -1 }).toArray();
        return res.status(200).json({
            message: "All list category..",
            data: result
        })
    } catch (err) {
        console.error("List error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const fetchcategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const listcategories = await getCategoryCollection();
        const fetchData = await listcategories.findOne({ _id: new ObjectId(id) });
        return res.status(201).json({
            message: "Successfully fetch data",
            data: fetchData
        });
    } catch (err) {
        console.error("Error..", err);
        return res.status(500).json({ message: "Internal error" });
    }
};