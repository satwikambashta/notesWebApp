import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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

export const getNote: RequestHandler = async(req, res, next)=>{
    const noteId = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId))
        {
            throw createHttpError(400, "invalid noteId");
        }

        const note = await NoteModel.findById(noteId).exec();
        if(!note)
        {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
        
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody{
    title?: string,
    text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown>= async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    
    try {

        if(!title)
        {
            throw createHttpError(400, "Note without title sent"); //bad request
        }
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

//update note

//update param since cannot be unknown
interface UpdateNoteParams{
    noteId: string,
}

interface UpdateNoteBody{
    title?:string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if(!mongoose.isValidObjectId(noteId))
        {
            throw createHttpError(400, "invalid noteId");
        }
        if(!newTitle)
        {
            throw createHttpError(400, "Note without title sent"); //bad request
        }
        const note = await NoteModel.findById(noteId).exec();
        if(!note)
        {
            throw createHttpError(404, "Note not found");
        }

        note.title= newTitle;
        note.text= newText;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}