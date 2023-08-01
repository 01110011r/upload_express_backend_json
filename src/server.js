import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/middleware.js";
import { fileUploadRoute } from "./routers/files.router.js";
dotenv.config();


function main(){
    try {
        const app=express();
        app.use(express.json());
        app.use(middleware);
app.use(fileUploadRoute);

        app.listen(process.env.PORT, process.env.HOST, console.log('done: '+process.env.PORT));
    } catch (error) {
        console.log(error.message);
    }
};
main();