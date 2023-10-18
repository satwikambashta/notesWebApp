import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";
import notesRoutes from "./routes/notes";  
import morgan from "morgan";
import userRoutes from "./routes/users";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
//create endpoints that returns the notes we create to the database

const app = express();

//morgan  gives information in terminal whenever get request used
app.use(morgan("dev"));

//send json to server
app.use(express.json());

//express-sessions
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60*60*1000, //life of cookie 1hr
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl:env.MONGO_CONNECTION_STRING
    }),
}));

//sign up
app.use("/api/users", userRoutes);

//endpoint to get notes
app.use("/api/notes", notesRoutes);

//middleware for handling non existent pages
app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found")); //404 resource not found
})

//middleware
//setting up an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);
    let statusCode =500;
    let errorMessage="Unknown error has occured";
    if(isHttpError(error))
    {
        statusCode=error.status;
        errorMessage=error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});
    


export default app;
