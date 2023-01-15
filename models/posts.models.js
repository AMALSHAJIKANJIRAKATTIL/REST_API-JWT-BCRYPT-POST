const mongoose=require('mongoose');
const Schema=mongoose.Schema;




const postSchema=new Schema({
    title : String,
    desc : String,
    user : {type : mongoose.Schema.Types.ObjectId , ref: 'user' }
});


const post = mongoose.model('post', postSchema);


module.exports= post;
