import express from "express"

const app=express();
const port = 5000;

//http endpoint get request
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port!, () => {
    console.log("Server running on port" + port);
})