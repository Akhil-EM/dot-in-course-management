const response = require("../models/api/response.model");
const statusCodes = require("../registry/html-status-codes");
module.exports =  function(roles){
    return (req,res,next)=>{
       let userRole = req.user.userType;
       let authorized = false;
       roles.forEach(role => {
        
           if(role === userRole){
              authorized = true;
           }
       });

       if(!authorized){
          return res.status(statusCodes.UNAUTHORIZED)
                    .json(response("failed","unauthorized"));
       }else{
          next();
       }
    }
}