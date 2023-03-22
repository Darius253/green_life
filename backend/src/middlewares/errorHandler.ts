import { BadAuthError } from "@utils/BadAuthError";
import { ValidationErrors } from "@utils/validationError";
import { NextFunction , Request , Response } from "express";


export function errorHandler(err:any , req:Request , res:Response , next:NextFunction){
  
if(err instanceof ValidationErrors  || err instanceof BadAuthError){

   return res.status(err.statusCode).send({
        success:false ,
        message:err.serialize()
    })
}

    res.status(err.code || 500).send({
        success: false,
        message:err.message
    })

}