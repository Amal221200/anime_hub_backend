import uploadOnCloudnary from "../utils/uploadOnCloudinary.js"

export const uploadFile = async (req, res) => {
    const filePath = req.file.path
    const url = await uploadOnCloudnary(filePath);
    return res.json(url);
}