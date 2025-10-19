import { Request, Response } from "express";
import { languageCreate } from "../models/languageModel"; // adjust the path
import { ObjectId } from "mongodb";

export const createLanguage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { language_name, status } = req.body;
        // Validate language_name
        if (!language_name || typeof language_name !== "string") {
            return res.status(400).json({ message: "language_name is required and must be a string" });
        }
        // Get collection
        const languageCollection = await languageCreate();
        // Prepare data
        const newLanguage = {
            language_name,
            status: status ?? true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Insert to DB
        const result = await languageCollection.insertOne(newLanguage);
        // Respond to client
        if (result.insertedId) {
            return res.status(200).json({
                status: "created",
                message: "Language created successfully",
                lan_id: result.insertedId,
            });
        } else {
            return res.status(400).json({
                status: "failed",
                message: "Language not created",
            });
        }
    } catch (err) {
        console.error("Create language error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateLanguage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid language ID" });
        }
        const languageCollection = await languageCreate();
        const result = await languageCollection.updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    ...updatedFields,
                    updatedAt: new Date()
                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Language not found or data is unchanged" });
        }
        return res.status(200).json({
            status: "updated",
            message: "Language updated successfully",
            updatedId: id
        });
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getalllang = async (req: Request, res: Response) => {
    try {
        const getalllanguage = await languageCreate();
        const getallresult = await getalllanguage.find().sort({ createdAt: -1 }).toArray();
        return res.status(200).json({
            message: "list all language",
            data: getallresult
        });
    } catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Internal server error", err });
    }
};

export const deletelang = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteobj = await languageCreate();
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const deleteResult = await deleteobj.deleteOne({ _id: new ObjectId(id) });
        if (deleteResult.deletedCount === 0) {
            console.log("Nothing deleted");
            return res.status(404).json({ message: "Item not found or already deleted" });
        }
        return res.status(200).json({
            status: "deleted",
            message: "Language deleted successfully",
        });
    } catch (err) {
        console.error("Delete Err.", err);
        return res.status(500).json({ message: "Internal Error" });
    }
};



export const fetchlanguage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const fetchobj = await languageCreate();
        const language = await fetchobj.findOne({ _id: new ObjectId(id) });
        if (!language) {
            return res.status(404).json({ message: "Language not found" });
        }
        // ✅ Return response
        res.status(200).json({
            message: "Language fetched successfully",
            data: language,
        });
    } catch (err) {
        console.error("Delete Err.", err);
        return res.status(500).json({ message: "Internal Error" });
    }
};