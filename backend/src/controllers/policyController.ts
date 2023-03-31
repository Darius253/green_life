import  {Request , Response} from 'express' ;
import  {Pol as Policy}from '@services/policyService' ; 




export const create =async(req:Request , res:Response)=>{

 return Policy.createPolicy(req , res) ; 


}

export const edit = async (req: Request, res: Response) => {
  return Policy.editPolicy(req, res);
};


export const get = async (req: Request, res: Response) => {
  return Policy.getPolicy(req, res);
};



