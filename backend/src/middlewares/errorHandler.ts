import { NextFunction , Request , Response } from "express";


export function errorHandler(err:any , req:Request , res:Response , next:NextFunction){
  

    res.status(err.code || 500).send({
        success: false,
        message:err.message
    })

}