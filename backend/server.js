const express = require("express");
const {connection} = require("./config/db");
const {userController} = require("./Routes/auth.route");
const {taskController} = require("./Routes/task.route");
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("API START");
})

app.use("/",userController);

app.use("/",taskController)

app.listen(port,async()=>{
    try {
        await connection
        console.log("MONGODB is connected to server")
    } catch (error) {
        console.log(error);
    }

    console.log("server is running");
})