
import { Loan } from '@models/Loan'
import { loanStatus } from '@models/models.interface';
import { BadAuthError } from '@utils/BadAuthError';
import  {Request , Response} from 'express'

export abstract class LoanService {
  abstract createRequest(req: Request, res: Response): Promise<any>;

  abstract approveRequest(req: Request, res: Response): Promise<any>;
  abstract rejectRequest(req: Request, res: Response): Promise<any>;

  abstract denyloan(req: Request, res: Response): Promise<any>;
  abstract acceptloan(req: Request, res: Response): Promise<any>;
   

 async editLoan(req:Request , res:Response){
     
  const loan =  await Loan.findById(req.params.id) ; 

  if(!loan){
    throw new BadAuthError("Loan not found" , 404) ;
  }


  if(loan.loanStatus !== loanStatus.PENDING){
    throw new BadAuthError("loan is no more pending" , 401) ;
  }
  
  loan.principal = +req.body.principal ; 
  loan.loanterm = +req.body.loanterm ; 

  await loan.save() ; 


  return res.send({
    success:true , data:{
      loan
    }
  })

  
  }
  
  
}




