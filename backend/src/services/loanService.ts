
import { ACTIONS } from '../actions';
import { Loan } from '../models/Loan'
import { Iclient, loanStatus } from '../models/models.interface';
import { BadAuthError } from '../utils/BadAuthError';
import  {Request , Response} from 'express'
import { logger } from '../utils/logger';
import { hubtelService } from './huntelService';


export abstract class LoanService {
  abstract createRequest(req: Request, res: Response): Promise<any>;

  abstract approveRequest(req: Request, res: Response): Promise<any>;
  abstract rejectRequest(req: Request, res: Response): Promise<any>;

  abstract denyloan(req: Request, res: Response): Promise<any>;
  abstract acceptloan(req: Request, res: Response): Promise<any>;
   

 async editLoan(req:Request , res:Response){
     
  const loan =  await Loan.findById(req.params.id) ; 

  if(!loan){
    throw new BadAuthError("Loan not found" , 404 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
  }


  if(loan.loanStatus !== loanStatus.PENDING){
    throw new BadAuthError("loan is no more pending" , 401 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
  }
  
  loan.principal = +req.body.principal ; 
  loan.loanterm = +req.body.loanterm ; 

  await loan.save() ; 

  
   logger.info({
     device: {
       ip: req.ip,
       agent: req.headers["user-agent"],
       method: req.method,
       url: req.url,
     },
     action: ACTIONS.EDIT_LOAN_ACTION,
     user: req.user,
     loan
   });

  return res.send({
    success:true , data:{
      loan
    }
  })

  
  }
  

async repaymentRequest(req:Request ,res:Response){
 console.log('gg')
const  loan = await  Loan.findById(req.params.id).populate<{client:Iclient}>('client') ;



  if(!loan){
    throw new BadAuthError("Loan not found" , 404 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
  }


  if(loan.loanStatus !== loanStatus.INPROGRESS){
    throw new BadAuthError("loan is no more in progress" , 401 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
  }

   if(loan.client._id.toString() !==  req.user.id){
 throw new BadAuthError(
   "loan is no more in progress",
   401,
   ACTIONS.EDIT_LOAN_ATTEMPTS
 ); 
   }


let {amount}  =  req.body; 

  

const data = await  hubtelService.receiveMoney({
  mobileNumber: loan.client.phoneNumber ,
  amount  ,
  title: 'loan repayment request' ,
  description: `Repaymet of loan with id ${loan._id.toString()}` ,
  clientReference: loan._id.toString() ,
  callbackUrl: 'https://eoo2gv2yay7zvw4.m.pipedream.net' 
})



res.send({
  sucess:true  , data
})

} 
  
}




