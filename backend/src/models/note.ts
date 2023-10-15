import {InferSchemaType, Schema, model} from "mongoose";
//note model
const noteSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String,},
},{timestamps: true});

//makes new datatype Note using template noteSchema
type Note = InferSchemaType<typeof noteSchema>;


//exporting model of type note.  creates collection Notes
export default model<Note>("Note", noteSchema);