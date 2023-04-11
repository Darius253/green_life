import { BadAuthError } from "../utils/BadAuthError";
import { ValidationErrors } from "../utils/validationError";
import { NextFunction , Request , Response } from "express";
import multer from "multer";


export function errorHandler(err:any , req:Request , res:Response , next:NextFunction){
  
    
if(err instanceof ValidationErrors  || err instanceof BadAuthError){
 
   return res.status(err.statusCode).send({
        success:false ,
        message:err.serialize()
    })
}

else {
    if(err instanceof multer.MulterError){
         return res.status(400).send({
           success: false,
           message: "uploading error , file may be too large or not the preferred file type",
         });
    }
}
    res.status(err.code || 500).send({
        success: false,
        message:err.message
    })

}