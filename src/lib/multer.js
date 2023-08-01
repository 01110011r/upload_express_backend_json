import fs from "fs";
import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =file.originalname;
      cb(null, uniqueSuffix);
    }
  })
  
 export const upload = multer({ storage });
  