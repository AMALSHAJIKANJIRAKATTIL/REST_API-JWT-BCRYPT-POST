const express=require('express');
const user=require('../models/user.models')
const reg=express.Router();
const {body, validationResult}=require('express-validator');
const bcrypt=require('bcrypt')

reg.get('/',(req,res)=>{
    res.send("You are in registration page...");
})

reg.post('/',body('name').isAlpha('en-US', {ignore: ' '}),body('password').isLength({ min: 5, max: 12 }),body('email').isEmail(),async (req,res)=>{
    
    try{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        
        return res.status(400).json({ errors: errors.array() })
    }

    const {name ,email,password}=req.body;

    // To check whether email is already in use 
    const present = await user.findOne({email: email});
    if(present){
        return res.status(400).send("Email id already registered....please try login....")
    }


    // Data Storing in DB
    bcrypt.hash(password, 10,async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            console.log(err);
            res.status(500).send({
              error : err
            }  
            )
        }

        const data = await user.create({
            name: name,
            email: email,
            password: hash
        });
        
        res.send({"status": "Success",
        "Data" : data});
    });
    
    }
    catch(e){
        //console.log(e);
        res.send({status: "Failed",
        message: "Registration is unsuccessful",
    error : e});
    }
})


module.exports=reg;
