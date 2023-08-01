import router from "express";
import { controllerImageDownload, controllerImageGet, fileUploadControlDelete, fileUploadControlGet, fileUploadControlPost, fileUploadControlPut } from "../controller/files.controller.js";
import { upload } from "../lib/multer.js";
export const fileUploadRoute=router();
fileUploadRoute.post('/files', upload.single("img"), fileUploadControlPost).get('/files', fileUploadControlGet);
fileUploadRoute.delete('/files/:id', fileUploadControlDelete).put('/files/:putid', upload.single("img"), fileUploadControlPut)
fileUploadRoute.get('/img/:params', controllerImageGet);
fileUploadRoute.get('/download/:params', controllerImageDownload);