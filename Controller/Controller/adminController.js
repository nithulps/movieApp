const admins = require('../Model/adminModel')
const jwt= require('jsonwebtoken')


// Admin register

exports.adminRegister=async (req,res)=>{
    const{email,password}=req.body

    console.log('inside register');
    // check email already exist
    try {
        const existingAdmin=await admins.findOne({email})
        // console.log(existingAdmin);
        if (existingAdmin) {
            res.status(406).json('Admin Already Exist! Please Login..')
        } else {
            const newAdmin= new admins({
                email,password
            })
            await newAdmin.save()
            res.status(200).json(newAdmin)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


// Admin login
exports.adminLogin=async(req,res)=>{
    const{email,password}=req.body
      try {
        const existingAdmin=await admins.findOne({email,password})
        console.log(existingAdmin);
        if (existingAdmin) {
            //generate token
            const token=jwt.sign({userId:existingAdmin._id},process.env.JWT_SECRET)
            res.status(200).json({existingAdmin,token})
        } else {          
            res.status(406).json('Email & Passsward does not match')
        }
    } catch (err) {
        res.status(401).json(err)
    }
}