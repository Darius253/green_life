import { NextFunction, Request , Response } from 'express';
import  {validationResult} from 'express-validator' ; 
import  {ValidationErrors} from '../utils/validationError' ; 
import { ACTIONS } from '../actions';




export function validate(req:Request ,res:Response, next:NextFunction){

 
   
    const errors =  validationResult(req) ; 
      
    if(!errors.isEmpty()){

         throw new ValidationErrors(errors.array() , ACTIONS.INPUT_ERROR_ACTION) 


    }


    next() ;

}