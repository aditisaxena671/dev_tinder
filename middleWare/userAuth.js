const adminAuth=(req,res,next)=>{
    const token="xyze";
    const authorization= token==="xyz";
    if(!authorization){
      res.status(401).send("unauthorized");
    }
    else{
      next();
    }
};

module.exports={
    adminAuth,
};