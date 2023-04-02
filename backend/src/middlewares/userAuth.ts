import  {NextFunction, Request, Response} from 'express' ; 
import {userRole} from '../models/models.interface'
import { BadAuthError } from '../utils/BadAuthError';





export const isAdmin =  (req:any, res:any,next:NextFunction)=>{

  if(req.user.role !== userRole.ADMIN){
    throw new BadAuthError("You are not authorized" , 401) ;
  }


  next() ; 

}

export const isRegionalAgent = (
  req: any,
  res: any,
  next: NextFunction
) => {
  if (!(req.user.role === userRole.ADMIN || req.user.role== userRole.REGIONALAGENT)) {
    throw new BadAuthError("You are not authorized", 401);
  }

  next() ;

};

export const userAuth = (req: any, res: any, next: NextFunction) => {
  if (
     !(Object.values(userRole).includes(req.user.role!))
  ) {
    throw new BadAuthError("You are not authorized", 401);
  }

  next();
};
