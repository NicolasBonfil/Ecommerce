import multer from "multer";
import __dirname from "../dirname.js"
import path from "path"

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  __dirname + `/public/products/images`)
    },
    filename: function(req, file,cb){
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage: storage})