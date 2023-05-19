import  {NextFunction, Request, Response} from 'express' ; 
import {userRole} from '../models/models.interface'
import { BadAuthError } from '../utils/BadAuthError';
import { ACTIONS } from '../actions';





export const isAdmin =  (req:Request, res:Response,next:NextFunction)=>{

  if(req.user.role !== userRole.ADMIN){
    throw new BadAuthError("You are not authorized" , 401 , ACTIONS.AUTHORIZING_USER_ATTEMPTS) ;
  }


  next() ; 

}

export const isRegionalAgent = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === userRole.ADMIN || req.user.role=== userRole.REGIONALAGENT){
      next();
   
  }else
         throw new BadAuthError("You are not authorized", 401 , ACTIONS.AUTHORIZING_USER_ATTEMPTS);

};

export const userAuth = (req: any, res: Response, next: NextFunction) => {
  if (
    !req.user.role || !(Object.values(userRole).includes(req.user.role) ) 
  ) {
    throw new BadAuthError("You are not authorized", 401 , ACTIONS.AUTHORIZING_USER_ATTEMPTS);
  }

  next();
};
