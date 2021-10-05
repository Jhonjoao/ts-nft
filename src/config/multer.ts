import { Request } from "express";
import multer from "multer";
import path from "path";

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: function (req: any, file: any, cb: any) {
            const filename = `${Math.random().toString(36)}-${file.originalname}`;
            cb(null, filename)
        }
    }),
}

function imageFilter(req: Request, file: any, cb: any) {

    if(file.mimetype === "image/jpg" || 
        file.mimetype ==="image/jpeg" || 
        file.mimetype ===  "image/png" ){
        
        cb(null, true);
    }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }

}

const upload = multer({ 
    fileFilter: imageFilter,
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE || 'local']
 });

export default upload;