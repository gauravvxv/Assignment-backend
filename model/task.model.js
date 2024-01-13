const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String}
})

const TaskModel = mongoose.model("task",taskSchema);

module.exports={
    TaskModel
}