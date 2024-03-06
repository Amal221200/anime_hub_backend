import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (localPath) => {
    try {
        if (!localPath)
            return null
        const res = await cloudinary.uploader.upload(localPath, { folder: 'zbpc', resource_type: "image" })
        console.log("File is uploaded");
        return res.secure_url
    } catch (error) {
        console.log(error);
        await fs.unlink(localPath);
        return null;
    }
}

export default uploadOnCloudnary;