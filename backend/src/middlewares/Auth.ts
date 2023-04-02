import jwt from 'jsonwebtoken';
import { BadAuthError } from '../utils/BadAuthError'; 
import { Payload } from 'app.interface';
import {NextFunction, Request , Response} from 'express'

declare  global{
    namespace Express{
        interface  Request{
            user:Payload
        }
    }
}


export const Auth = (req:Request ,res:Response ,next:NextFunction)=>{
     
    if(!req.headers["authorization"]){
        throw new BadAuthError("Authorization failed" , 401); 
    }

    const  [_ ,  token] =  req.headers["authorization"].split(" "); 
   
    if(!token){
        throw new BadAuthError("Authorization failed", 401); 
    }

 
    try { 
    
        const payload =  jwt.verify(token , process.env.JWT_SECRET!)  as Payload ;
             console.log(payload)
             
        req.user=  payload ; 
      
        
    } catch (error) {
        
        console.log(error); 
         throw new BadAuthError("Authorization failed", 401); 
    }

    next() ;

}