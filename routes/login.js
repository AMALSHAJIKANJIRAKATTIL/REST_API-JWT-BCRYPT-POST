const express=require('express');
const bcrypt=require('bcrypt')
const router=express.Router();
const user=require('../models/user.models')
const {body, validationResult}=require('express-validator')
const jwt =require('jsonwebtoken');



// JWT secret key
const secret="amalshaji";

router.get('/',(req,res)=>{
    //console.log('Login...');
    res.send('You are in login page');
})


router.post('/',body('email').isEmail(),async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        // If the provided email is not an email format
        return res.status(400).send({status : "Failed", error : errors})
    }
    const {email , password}=req.body;

    // Finding user with the email
    const present=await user.findOne({email : email})
    if(!present){
        // If no user is found with provided email
        return res.status(400).send("No user registered with this email...try signup...");
    }

    // Password Match Check
    const match = await bcrypt.compare(password, present.password);
    
    // If password is wrong
    if(!match){
        return res.status(400).send({status : "Failed", error : "Invalid password!!!"})
    }

    // JWT token
    const token= jwt.sign({user : present._id , userName: present.name},secret);
    res.status(200).send({ status : "Success",
    message : "Logged in",
    token : token });
});

module.exports = router;