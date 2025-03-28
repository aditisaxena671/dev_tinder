const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://aaddiiti190:aaddiiti190@cluster1.uuoa1.mongodb.net/devTinder"
    );
};
module.exports=connectDB;
// connectDB().then(()=>{
//     console.log("database connection stablished")
// }).catch(err=>{
//     console.error("database cannot be coonected "+err)
// })

// i'm great