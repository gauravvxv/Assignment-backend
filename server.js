const express = require("express");
const {connection} = require("./config/db");
const {userController} = require("./Routes/auth.route");

const app = express();

app.use(express.json());

const port = 8000;

app.get("/",(req,res)=>{
    res.send("API START");
})

app.use("/",userController);

app.listen(port,async()=>{
    try {
        await connection
        console.log("MONGODB is connected to server")
    } catch (error) {
        console.log(error);
    }

    console.log("server is running");
})