import app from "./app";
import mongoose from "mongoose";
import env from"./util/validateEnv";
import NoteModel from "./models/note";


const port = env.PORT;


//envalid package. we created validateEnv to set value of port and connection strings to not be undefined. server will give error if type is not string or number here
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to mongoDB through mongoose");
        app.listen(port!, () => {
            console.log("Server running on port" + port);
        })
    })
    .catch(console.error);

