const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const validator = require('validator')

const CreateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
};

module.exports.registerUser = async (req, res) => {
    const {Name,Email,Password} = req.body;
   // validation
   let emptyFields = [];

   if(!Name && !Email && !Password){
       emptyFields.push("Name", "Email", "Password");
       return res.status(400).json({error:"Please fill all the fields", emptyFields});
   }
   if(!Name){
       emptyFields.push("Name");
       return res.status(400).json({error:"Please enter your Name", emptyFields})
   }
   if(!Email){
       emptyFields.push("Email");
       return res.status(400).json({error:"Please enter your email", emptyFields})
   }
   if(!Password){
       emptyFields.push("Password");
       return res.status(400).json({error:"Please enter your password", emptyFields})
   }
    try{
        const user = await UserModel.signup(Name,Email,Password)
        const token = CreateToken(user._id);
        res.status(200).json({Name:user.Name,token})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports.fetchUsers = async (req, res) => {
    await UserModel.find({}).sort({createdAt: -1})
    .then((response) => {
        if(response){
            res.status(201).json(response)
        } else {
            res.status(400).json({error:"No users available."})
        }
    })
    
}

module.exports.fetchUser = async (req,res) => {
    const { id } = req.params

    await UserModel.findById({_id:id})
    .then((response) => {
        res.status(201).json(response)
    })
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params

    await UserModel.findByIdAndRemove({_id:id})
    .then((response) => {
        res.status(201).json(response)
    })
}

module.exports.editUser = async (req,res) => {
    const { id } = req.params

    await UserModel.findByIdAndUpdate({_id:id}, {...req.body})
    .then((response) => {
        res.status(201).json({response})
    })
}

module.exports.loginUser = async (req, res) => {
    const {Email, Password} = req.body
    try{
        const user =  await UserModel.login(Email,Password)
        const token = CreateToken(user._id)
        res.status(201).json({Name:user.Name,token})
    }
    catch (error){
        res.status(400).json({error:error.message})
    }
}