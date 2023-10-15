import {getNotes, createNotes, getNote} from "../controllers/notes"
import express from "express";

const router = express.Router();
//http get request
router.get("/", getNotes);

//http post request
router.post("/", createNotes);

//http get by id
router.get("/:noteId", getNote);

export default router;