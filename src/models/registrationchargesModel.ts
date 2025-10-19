import { connectDB } from "../dbconnection";
import { Db, ObjectId, Collection } from "mongodb";


export interface Registrationcharges {
    id?: ObjectId;
    price: BigInt;
    status: boolean;
    year: 1;
    createdAt: Date;
    renual_price: BigInt;
    updatedAt: Date;
}

export const resgistrationcharge = async (): Promise<Collection<Registrationcharges>> => {
    const db: Db = await connectDB();
    return db.collection<Registrationcharges>("registration_charges");
}