const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");
        console.log("Mongodb is now reach");
    }catch(error){
        console.log(error);
    }
};
module.exports = connectDB;