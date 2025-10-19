import { Db, Collection, ObjectId } from "mongodb";
import { connectDB } from "../dbconnection";

export interface Category {
    _id?: ObjectId;
    name: string;
    image: string;
    platform_fee: number;
    convenience_fee?: number;
    createdAt: Date;
    updatedAt: Date;
}

export const getCategoryCollection = async (): Promise<Collection<Category>> => {
    const db: Db = await connectDB();
    return db.collection<Category>("categories");
};