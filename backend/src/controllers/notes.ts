import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
    try{
        const Notes = await NoteModel.find().exec();
        //http request for ok
        res.status(200).json(Notes);
    }
    catch(error){
        //middleware
        next(error);
        
    }
};

export const createNotes: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    
    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });
        //new resource created http code 201
        res.status(201).json(newNote);
    } 
    catch (error) {
        next(error);
    }    
};