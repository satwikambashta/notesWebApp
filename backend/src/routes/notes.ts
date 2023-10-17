import {getNotes, createNotes, getNote, updateNote} from "../controllers/notes"
import express from "express";

const router = express.Router();
//http get request
router.get("/", getNotes);

//http post request
router.post("/", createNotes);

//http get by id
router.get("/:noteId", getNote);

//update note
router.patch("/:noteId", updateNote)

export default router;