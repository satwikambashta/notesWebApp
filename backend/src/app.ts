import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";  
//create endpoints that returns the notes we create to the database

const app = express();
//http endpoint get request
app.get("/", async (req, res) => {
    const Notes = await NoteModel.find().exec();
    //http request for ok
    res.status(200).json(Notes);
})

export default app;
