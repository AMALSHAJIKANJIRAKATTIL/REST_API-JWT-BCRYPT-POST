const posts=require('../models/posts.models');
const express=require('express');
const jwt=require('jsonwebtoken');
const secret="amalshaji";
const postRout=express.Router();
const {body , validationResult}=require('express-validator')

postRout.post('/',body('title').exists(),body('desc').exists(),async (req,res)=>{
    try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        
        return res.status(400).json({ errors: errors.array() })
    }

    const verified=jwt.verify(req.headers.token,secret);
    if(verified){
        const newPost=await posts.create({
            title : req.body.title,
            desc : req.body.desc,
            user: verified.user
        });
        return res.send({status: "Post created!!!", post : newPost})
    }
    else{
        return res.status(400).send({status : "Failed"})
    }
}
catch(e){
    res.send({Status : "Failed", message : e})
}
    
})




postRout.put('/:id',async (req,res)=>{
    try{
        
    
        const verified=jwt.verify(req.headers.token,secret);
        if(verified){

            const doc =await posts.findOne({_id : req.params.id})
            
            
                if(doc.user._id.toString()===verified.user){
                    const updatePost=await posts.updateOne({_id: req.params.id},
                        req.body
                    );
                    return res.send({status: "Post updated!!!", post : req.body})
                }
                else{
                    return res.send({status: "Failed" , message : " You are not the owner of this post..."})
                }
            
        }
        else{
            return res.status(400).send({status : "Failed"})
        }
    }
    catch(e){
        res.send({Status : "Failed catched error...", message : e})
    }
})



postRout.delete('/:id',async (req,res)=>{
    try{
        
    
        const verified=jwt.verify(req.headers.token,secret);
        if(verified){

            const doc =await posts.findOne({_id : req.params.id})
             
            
                if(doc.user._id.toString()===verified.user){
                    const updatePost=await posts.deleteOne({_id: req.params.id});
                    return res.send({status: "Post Deleted!!!", post : updatePost})
                }
                else{
                    return res.send({status: "Failed" , message : " You are not the owner of this post..."})
                }
            
        }
        else{
            return res.status(400).send({status : "Failed"})
        }
    }
    catch(e){
        res.send({Status : "Failed catched error...", message : e})
    }
})



postRout.get('/:id',async (req,res)=>{
try{

    const getpost=await posts.findOne({_id:req.params.id});
    if(!getpost){
        return res.send({data : "No data found..."})
    }
    return res.send({data : getpost})
}
catch(e){
    res.send({status: " Failed" , message : e})
}
})


module.exports=postRout;