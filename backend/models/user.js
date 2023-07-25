const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserModel = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unqiue: true
    },
    Password: {
        type: String,
        required: true
    },
    Role:{
        type: Boolean,
        default: false
    }
},{timestamps:true}) 

UserModel.statics.signup = async function(Name,Email,Password){
    if(!Name || !Email || !Password){
        throw Error("All field must be filled")
    }
    if(!validator.isEmail(Email)){
        throw Error("Invalid Email")
    }
    // if(!validator.isStrongPassword(Password)){
    //     throw Error("Password is not strong enough.")
    // }
    const exists = await this.findOne({Email})

    if(exists){
       throw Error("Email is already taken.")
    }
    const salt = await bcrypt.genSalt(10);   
    const hash = await bcrypt.hash(Password,salt)
    const user = await this.create({Name,Email,Password:hash})

    return user

}

UserModel.statics.login = async function(Email, Password){
    if(!Email || !Password){
        throw Error("All field must be filled")
    }
    if(!validator.isEmail(Email)){
        throw Error("Invalid Email")
    }

    const user = await this.findOne({Email})

    if(!user){
        throw Error("Invalid credentials.")
    }
    const match = await bcrypt.compare(Password,user.Password)
    
    if(!match){
        throw Error("Invalid credentials")
    }
    return user
    
}

module.exports = mongoose.model("User", UserModel)