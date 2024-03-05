import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDB(callback){
    connect(process.env.DATABASE_URI).then(()=> {
        console.log("Connected")
        callback()
    })
}