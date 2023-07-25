const TaskModel = require('../models/task');
const mongoose = require('mongoose');
// get all task
module.exports.getTasks = async (req,res) => {
    const UserID = req.user._id
    try{
        const task = await TaskModel.find({UserID}).sort({createdAt: -1});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

// create task
module.exports.createTask = async (req,res) => {
    const {Name, Description} = req.body

    let emptyFields = [];

    if(!Name && !Description){
        emptyFields.push('Name','Description')
        return res.status(400).json({error: "Please fill all the fields",emptyFields})
    }
    if(!Name){
        emptyFields.push('Name')
        return res.status(400).json({error: "Please enter a name",emptyFields})
    }
    if(!Description){
        emptyFields.push('Description')
        return res.status(400).json({error: "Please enter a Description",emptyFields})
    }
  


    try{
        const UserID = req.user._id
        const task = await TaskModel.create({Name, Description,UserID})
        console.log(UserID)
        res.status(200).json(task);
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// get single task
module.exports.getTask = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Task"})
    }

    const task = await TaskModel.findById({_id:id});
    if(!task){
        return res.status(404).json({error: "No such Task"})
    }
    res.status(200).json(task); 
}

// delete single task
module.exports.deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Task, therefore i cannot delete it."})
    }

    const task = await TaskModel.findOneAndDelete({_id:id})
    if(!task){
        return res.status(404).json({error:"No such task"})
    }
    res.status(200).json(task);
}

// update single task
module.exports.editTask = async (req,res) => {    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such Task"});
    } 
    const task = await TaskModel.findOneAndUpdate({_id:id},{...req.body})
    if(!task){
        return res.status(400).json({error:"No such task"})
    }
    res.status(200).json(task);
}