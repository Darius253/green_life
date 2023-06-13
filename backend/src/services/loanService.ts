
import { ACTIONS } from '../actions';
import { Loan } from '../models/Loan'
import { Iclient, loanInstallmentStatus, loanStatus } from '../models/models.interface';
import { BadAuthError } from '../utils/BadAuthError';
import  {Request , Response} from 'express'
import { logger } from '../utils/logger';
import moment from 'moment';
import { hubtelRoute } from '@routes/hubtel';
import { hubtelService } from './huntelService';

export abstract class LoanService {
  abstract createRequest(req: Request, res: Response): Promise<any>;

  abstract approveRequest(req: Request, res: Response): Promise<any>;
  abstract rejectRequest(req: Request, res: Response): Promise<any>;

  abstract denyloan(req: Request, res: Response): Promise<any>;
 async acceptloan(req: Request, res: Response){
  
  const loan =  await Loan.findById(req.params.id).populate<{client:Iclient}>("client") ;
 
  if(!loan){
    throw new BadAuthError("Loan not found" , 404, ACTIONS.ACCEPT_LOAN_ATTEMPTS) ;

  }

  if(loan.client._id.toString() !== req.user.id ){

    throw new BadAuthError("user not authorized" , 401 , ACTIONS.ACCEPT_LOAN_ATTEMPTS) ;
  }


  if(loan.loanStatus !== loanStatus.APPROVED){

    throw new BadAuthError("loan already accepted" , 401 , ACTIONS.ACCEPT_LOAN_ATTEMPTS) ;
  }

 
 

  let newLoan = await  Loan.findOneAndUpdate({_id:loan._id} , {$set:{
   
loanStatus:loanStatus.ACCEPTED ,
DateAccepted : moment().toDate(), 
DatePaid:  moment().toDate() , 
 installment: [{
   amount : loan.monthlyPayment , 
   dueDate : moment().add(1 , "M").toDate(), 
   remainingBalance: loan.monthlyPayment ,
   status :  loanInstallmentStatus.UNPAID ,
   latePayment:false ,
 }]
}}   , {new:true ,upsert:true})


//sen money to user 
hubtelService.sendMoney({
  mobileNumber:loan.client.phoneNumber ,
  amount :loan.principal ,
  title: `Loan with id ${loan._id.toString()}  has been accepted`,
  description: `Loan with id ${loan._id.toString()} and amount ${loan.principal} has been paid. Your first installment is due ${newLoan.installment[0].dueDate}` ,
  clientReference: loan._id.toString() ,
  callbackUrl : "" ,
})
console.log("ff")


///return res
res.send({
  success:true , data:{
    loan:newLoan
  }
})

 }
   

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
  
  
}




