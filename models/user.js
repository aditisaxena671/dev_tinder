const mongoose= require("mongoose")
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,// trims extra spaces in a email id
        lowercase:true,//converts email id to lowercase
    },
    password:{
        type:String,
        required:true,  
        minimum:8,

    },
    age:{
        type:Number,
        min:18,
        default:18,
    },
    gender:{
        type:String
    },
    photoUrs:{
        type:String
    },
    skills:{
        type:[String]
    }
},{timestamps:true});

const userModel= mongoose.model("User",userSchema);
module.exports= userModel;

