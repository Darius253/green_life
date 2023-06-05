import jwt from 'jsonwebtoken';
import { BadAuthError } from '../utils/BadAuthError'; 
import { Payload } from 'app.interface';
import {NextFunction, Request , Response} from 'express'
import { ACTIONS } from '../actions';

declare  global{
    namespace Express{
        interface  Request{
            user:Payload
        }
    }
}


export const Auth = (req:Request ,res:Response ,next:NextFunction)=>{
     console.log(req.headers['authorization'])
    if(!req.headers["authorization"]){
        throw new BadAuthError("Authorization failed" , 401 , ACTIONS.AUTHORIZING_USER_ATTEMPTS); 
    }

    const  [_ ,  token] =  req.headers["authorization"].split(" "); 
   
    if(!token){
        throw new BadAuthError("Authorization failed", 401 , ACTIONS.AUTHORIZING_USER_ATTEMPTS); 
    }

 
    try { 
    
        const payload =  jwt.verify(token , process.env.JWT_SECRET!)  as Payload ;
            
        req.user=  payload ; 
      
        console.log(payload)
    } catch (error) {
        
       
         throw new BadAuthError("Authorization failed", 401, ACTIONS.AUTHORIZING_USER_ATTEMPTS); 
    }

    next() ;

}