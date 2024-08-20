const mongoose= require('mongoose')
const adminSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})
const admins= mongoose.model('admins',adminSchema)
module.exports=admins