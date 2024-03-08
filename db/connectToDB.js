import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDB(){
    await connect(process.env.DATABASE_URI);
    console.log("Connected");
}