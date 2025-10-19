import { Db, Collection } from "mongodb";
import { connectDB } from "../dbconnection";

export interface User {
    email_id: string;
    password: string;
}

let Users: Collection<User>;

export const initUserModel = async () => {
    const db: Db = await connectDB();
    Users = db.collection<User>("users");
};

/**
 * Get the Users collection after initialization
 */

export const getUsersCollection = (): Collection<User> => {
    if (!Users) {
        throw new Error("Users collection is not initialized. Call initUserModel() first.");
    }
    return Users;
};
