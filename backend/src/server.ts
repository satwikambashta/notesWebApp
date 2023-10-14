import "dotenv/config";
import mongoose from "mongoose";
import express from "express"

const app = express();
const port = process.env.PORT;

//http endpoint get request
app.get("/", (req, res) => {
    res.send("Hello");
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("Connected to mongoDB through mongoose");
        app.listen(port!, () => {
            console.log("Server running on port" + port);
        })
    })
    .catch(console.error);

