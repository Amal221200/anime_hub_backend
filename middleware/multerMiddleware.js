import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(import.meta.dirname, '..', 'public', 'uploads'))
    },
    filename(req, file, cb) {
        cb(null, `${Math.floor(Math.random() * 50)}_${file.originalname}`)
    }
})

const upload = multer({ storage })

export default upload;
