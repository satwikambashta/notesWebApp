import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import env from"./util/validateEnv";

const app = express();
const port = env.PORT;

//we made validateEnv to set value of port and connection strings to not be undefined. server will give error if type is not string or number here
//http endpoint get request
app.get("/", (req, res) => {
    res.send("Hello");
})

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to mongoDB through mongoose");
        app.listen(port!, () => {
            console.log("Server running on port" + port);
        })
    })
    .catch(console.error);

