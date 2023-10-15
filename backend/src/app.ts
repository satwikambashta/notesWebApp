import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";
import notesRoutes from "./routes/notes";  
import morgan from "morgan";
//create endpoints that returns the notes we create to the database

const app = express();

//morgan  gives information in terminal whenever get request used
app.use(morgan("dev"));

//send json to server
app.use(express.json());

//endpoint to get notes
app.use("/api/notes", notesRoutes);

//middleware for handling non existent pages
app.use((req, res, next)=>{
    next(Error("Endpoint not found"));
})

//middleware
//setting up an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);
    let errorMessage="Unknown error has occured";
    if(error instanceof Error)
    {
        errorMessage=error.message;
    }
    res.status(500).json({error: errorMessage});
});
    


export default app;
