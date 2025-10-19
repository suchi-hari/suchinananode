
import { MongoClient, Db } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI as string;
if (!uri) throw new Error("MONGO_URI not defined in .env");
const client = new MongoClient(uri);
export const db = client.db("nodejs");

export const connectDB = async () => {
    try {
        await client.connect();
        return client.db(); //Return db instance here
    } catch (err) {
        console.error("Connection failed", err);
        process.exit(1);
    }
};