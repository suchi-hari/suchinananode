import { Request, Response } from "express";
import { sociallinkClass } from "../models/sociallinksModel";
import { ObjectId } from "mongodb";

export const addsociallink = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            facebook,
            instagram,
            twitter,
            youtube,
            status,
            whatsapp_number,
            rating_link
        } = req.body;

        // Basic validation (optional, but good to have)
        if (!facebook && !instagram && !twitter && !youtube) {
            return res.status(400).json({
                status: "failed",
                message: "At least one social media link is required"
            });
        }
        const socialCollection = await sociallinkClass();
        const socialData = {
            facebook: facebook || "",
            instagram: instagram || "",
            twitter: twitter || "",
            youtube: youtube || "",
            status: status ?? true,
            whatsapp_number: whatsapp_number || "",
            rating_link: rating_link || "",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await socialCollection.insertOne(socialData);
        if (result.insertedId) {
            return res.status(201).json({
                status: "added",
                message: "Social link added successfully",
                id: result.insertedId
            });
        } else {
            return res.status(400).json({
                status: "failed",
                message: "Social link not added"
            });
        }
    } catch (err) {
        console.error("Add social link error:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const listsocialdata = async (req: Request, res: Response) => {
    try {
        const listallsocialData = await sociallinkClass();
        const listsocialDataarray = await listallsocialData.find().sort({ createdAt: -1 }).toArray();
        if (listsocialDataarray) {
            return res.status(200).json({
                status: "success",
                message: "Listing all data",
                data: listsocialDataarray
            });
        }
    } catch (err) {
        console.error("Err", err);
        return res.status(500).json({ message: "Error" });
    }
};


export const deletesocalilLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const listallsocialData = await sociallinkClass();
        const deleteData = await listallsocialData.deleteOne({ _id: new ObjectId(id) });
        //console.log(deleteData);
        if (deleteData.deletedCount === 0) {
            console.log("Nothing deleted");
            return res.status(404).json({ message: "Item not found or already deleted" });
        }
        return res.status(200).json({
            status: "deleted",
            message: "Sociallink deleted successfully",
        });
    } catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Internal Error" });
    }
};


export const updatesociallink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const udpateData = req.body;
        const listallsocialData = await sociallinkClass();
        const result = await listallsocialData.updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    ...udpateData,
                    updatedAt: new Date()
                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Social link data not update" });
        }
        return res.status(200).json({ status: "success", message: "Social link updated successfully" });
    } catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Error" });
    }
};


export const fetchsocialData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const listallsocialData = await sociallinkClass();
        const fetchData = await listallsocialData.findOne({ _id: new ObjectId(id) },
            { projection: { facebook: 1, instagram: 1, youtube: 1, whatsapp_number: 1, rating_link: 1, status: 1, _id: 1 } });
        if (!fetchData) {
            return res.status(404).json({ message: "Social data not found" });
        }
        return res.status(200).json({
            status: "success",
            data: fetchData,
        });
    } catch (err) {
        console.error("Error fetching language by ID:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

