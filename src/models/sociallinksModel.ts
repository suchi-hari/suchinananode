import { connectDB } from "../dbconnection";
import { Db, Collection, ObjectId } from "mongodb";

export interface Sociallink {
    id?: ObjectId;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    whatsapp_number: string;
    rating_link: string;
}

export const sociallinkClass = async (): Promise<Collection<Sociallink>> => {
    const db: Db = await connectDB();
    return db.collection<Sociallink>("social_links");
}