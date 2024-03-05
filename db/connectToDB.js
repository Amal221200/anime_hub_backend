import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDB(){
    connect(process.env.DATABASE_URI).then(()=> {
        console.log("Connected")
    })
}