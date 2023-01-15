const express=require('express');
const conn=require('./connections/conn');
const app=express();
const user=require('./models/user.models')
const loginroutes=require('./routes/login')
const regroutes=require('./routes/register')
const bodyParser=require('body-parser');
const postroutes=require('./routes/post')

conn();

//body parsing 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/login',loginroutes);
app.use('/post',postroutes)
app.use('/register',regroutes);

app.listen(3000,()=>console.log("Listening on 3000........."));