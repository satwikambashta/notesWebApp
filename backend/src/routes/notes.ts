import {getNotes, createNotes} from "../controllers/notes"
import express from "express";

const router = express.Router();
//http get request
router.get("/", getNotes);

//http post request
router.post("/", createNotes);

export default router;