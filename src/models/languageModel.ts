import { Db, Collection, ObjectId } from "mongodb";
import { connectDB } from "../dbconnection";

export interface Language {
    _id?: ObjectId; // ✅ Correct type
    language_name: string;
    status: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export const languageCreate = async (): Promise<Collection<Language>> => {
    const db: Db = await connectDB();
    return db.collection<Language>("languages");
};