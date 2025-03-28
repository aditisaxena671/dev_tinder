const express = require('express');
const connectDB= require("./config/database");
const app = express();
const User= require("./models/user")
app.use(express.json());

app.post("/signup", async (req,res)=>{
    // console.log(req.body);
    // using req.body as app.use(express.Json()) converts json to js object
    const user= new User(req.body);
    const userEmail= req.body.emailId;
    const emailCheck= await User.findOne({emailId:userEmail});
    if(!emailCheck){
      try{
        await user.save();
        res.send("user added");
      }
      catch(err){
        res.status(400).send("something went wrong");
        console.log(err);
      }
    }
    else{
      res.status(400).send("email id already exists");
    }  

});
//get user by Email id
app.get("/getByEmail", async (req,res)=>{
  const userEmail= req.body.emailId;
  try{
    const user= await User.find({ emailId: userEmail });
    if(user===0){
      res.status(404).send("user not found");
    }
    else{
      res.send(user);
    }
  }
  catch(err){
    res.status(400).send("something went wrong");
    console.log(err);
  }
});
//feed api
app.get("/feeds", async(req,res)=>{
  try{
    // const user= await User.find();

    // fetching all data
    res.send(await User.find({}));
  } 
  catch(err){
    res.status(404).send("no users available");
  }
});

app.delete("/deleteUserByEmail", async (req,res)=>{
  const userEmail= req.body.emailId;  
  const user= await User.findOne({emailId:userEmail});
  if(!user){
    return res.status(404).send("user not found");
  }
  const userFirstName= user.firstName;
  try{
    const result= await User.deleteOne({emailId:userEmail});
    if(result.deletedCount===0){
      res.status(404).send("user not found");
    }
    else{
      // const userFirstName= req.body.firstName;
      res.status(200).send("user "+userFirstName+" deleted succesfuult");
      // res.status(200).send("user deleted succesfuult");

    }
  }
  catch(err){
    res.status(400).send("something went wrong");
    console.log(err);
  }
});

//update user by email id
app.patch("/updateUserByEmail", async (req,res)=>{
  const userId=req.body.userId
  const data= req.body;
  const ALLOWED_UPDATE=["userId","gender","age","skills","firstName"];
  const isUpdateAllowed=Object.keys(data).every((k)=>
    ALLOWED_UPDATE.includes(k)
  );
  if(!isUpdateAllowed){
    return res.status(400).send("invalid update");
  }
  try{
    await User.findByIdAndUpdate({_id:userId},data,{
      runValidators: true,
    });
    
    res.status(200).send("user updated"); 
  }catch(err){
    res.status(400).send("something went wrong ERROR: "+err);

  }
});



// Start the server and listen on port 3000
connectDB().then(()=>{
  console.log("database connection stablished");
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err=>{
  console.error("database cannot be coonected "+err);
})















// const {adminAuth}= require("./middleWare/userAuth");
// app.use("/admin",adminAuth);
// app.get("/user",(req,res)=>{
//   res.send("hello from user get API");
// });
// app.get("/admin/addUser",(req,res)=>{
//   res.send("user added");
// });
// app.get("/admin/delete",(req,res)=>{
//   res.send("user deleted");
// });

// app.post("/user",(req,res)=>{
//   res.send("hello from user post API call");
// });
// app.use("/test",(req,res)=>{
//     res.send("hello test");
// });
// app.use("/",(req,res)=>{
//     res.send("this is a dashboard");
// });
