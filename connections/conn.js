const mongoose=require('mongoose');

async function getconnection(){
    mongoose.set('strictQuery', true);
    await (await mongoose.connect('mongodb://localhost/project'));
}

module.exports = getconnection;