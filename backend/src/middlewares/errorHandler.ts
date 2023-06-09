import { BadAuthError } from "../utils/BadAuthError";
import { ValidationErrors } from "../utils/validationError";
import { NextFunction , Request , Response } from "express";
import multer from "multer";
import  {logger} from '../utils/logger'



export function errorHandler(err:any , req:Request , res:Response , next:NextFunction){
  
    console.log(err)
if(err instanceof ValidationErrors  || err instanceof BadAuthError){
 
    
        logger.error({body:req.body , device:{ip:req.ip , agent:req.headers["user-agent"] , method:req.method , url:req.url} , err:err.serialize() , action:err.action});
    
   return res.status(err.statusCode).send({
        success:false ,
        message:err.serialize()
    })
}

else {
    if(err instanceof multer.MulterError){
        logger.error(
          `400 uploading error , file may be too large or not the preferred file type`
        );
         return res.status(400).send({
           success: false,
           message: "uploading error , file may be too large or not the preferred file type",
         });
    }
}

logger.error({statusCode:err.code ,body:req.body ,  device:{ip:req.ip , agent:req.headers["user-agent"] , method:req.method , url:req.url}, message:err.message})
    res.status(err.code || 500).send({
        
        success: false,
        message:err.message
    })

}           