const {Router} = require("express");
const {TaskModel} = require("../model/task.model");
const {validateTask} = require("../middlewares/validate")
const taskController = Router();




taskController.get("/task",async(req,res)=>{
   try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
   } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
   }
})

taskController.post("/task/add", validateTask, async (req,res)=>{
    try {
        const taskData = req.body;
        await TaskModel.insertMany(taskData);
        res.status(200).send("Task Added")
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went Wrong");
    }
})

taskController.patch("/task/:ID",validateTask,async(req,res)=>{
    try {
        const id = req.params.ID;
        await TaskModel.findByIdAndUpdate(id,req.body);
        res.status(200).send("Update successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went Wrong");
    }
})

taskController.delete("/task/:ID",async (req,res)=>{
    try {
        const id = req.params.ID;
        await TaskModel.findByIdAndDelete(id,req.body);
        res.status(200).send("Task is Deleted");
    } catch (error) {
        console.log(error);
        console.log("Something went wrong");
    }
})

module.exports={
    taskController
}