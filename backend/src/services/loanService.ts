
import { ACTIONS } from '../actions';
import { Loan } from '../models/Loan'
import { Iclient, loanStatus } from '../models/models.interface';
import { BadAuthError } from '../utils/BadAuthError';
import  {Request , Response} from 'express'
import { logger } from '../utils/logger';
import { hubtelService } from './huntelService';
import moment from 'moment';
import { loanInstallmentStatus } from '../models/models.interface';

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

    throw new BadAuthError("loan already accepted or not approved" , 401 , ACTIONS.ACCEPT_LOAN_ATTEMPTS) ;
  }


  let newLoan ;

  
  const currentLoan =  await Loan.findOne({client:req.user.id , loanStatus:loanStatus.INPROGRESS}) ;
   
  if(currentLoan){
       
        if(currentLoan.remainingBalance > loan.principal){

          throw new BadAuthError(
            "loan topup failed",
            401,
            ACTIONS.ACCEPT_LOAN_ATTEMPTS
          );

        }

  let x =  currentLoan.remainingBalance ;
        currentLoan.loanStatus = loanStatus.SETTLED ;
        currentLoan.remainingBalance =  0.0;
        currentLoan.save() ;

 newLoan = await Loan.findOneAndUpdate(
   { _id: loan._id },
   {
     $set: {
       DateAccepted: moment().toDate(),
       loanStatus: loanStatus.INPROGRESS,
       DatePaid: moment().toDate(),
       installment: [
         {
           amount: loan.monthlyPayment,
           dueDate: moment().add(1, "M").toDate(),
           remainingBalance: loan.monthlyPayment,
           status: loanInstallmentStatus.UNPAID,
           latePayment: false,
         },
       ],
     },
   },
   { new: true, upsert: true }
 );
      
 hubtelService.sendMoney({
   mobileNumber: loan.client.phoneNumber,
   amount: loan.principal - x,
   title: `Loan with id ${loan._id.toString()}  has been accepted`,
   description: `Loan with id ${loan._id.toString()} and amount ${
     loan.principal
   } has been paid. Your first installment is due ${
     newLoan.installment[0].dueDate
   }`,
   clientReference: loan._id.toString(),
   callbackUrl: "https://eoo2gv2yay7zvw4.m.pipedream.net",
 });

return res.send({
  success: true,
  data: {
    loan: newLoan,
  },
});

  }
 

   newLoan = await  Loan.findOneAndUpdate({_id:loan._id} , {$set:{
    
DateAccepted : moment().toDate(), 
loanStatus: loanStatus.INPROGRESS,
DatePaid:  moment().toDate() , 
 installment: [{
   amount : loan.monthlyPayment , 
   dueDate : moment().add(1 , "M").toDate(), 
   remainingBalance: loan.monthlyPayment ,
   status :  loanInstallmentStatus.UNPAID ,
   latePayment:false ,
 }] , 
  
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
   

//  async editLoan(req:Request , res:Response){
     
//   const loan =  await Loan.findById(req.params.id) ; 

//   if(!loan){
//     throw new BadAuthError("Loan not found" , 404 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
//   }


//   if(loan.loanStatus !== loanStatus.PENDING){
//     throw new BadAuthError("loan is no more pending" , 401 , ACTIONS.EDIT_LOAN_ATTEMPTS) ;
//   }
  
//   loan.principal = +req.body.principal ; 
//   loan.loanterm = +req.body.loanterm ; 

//   await loan.save() ; 

  
//    logger.info({
//      device: {
//        ip: req.ip,
//        agent: req.headers["user-agent"],
//        method: req.method,
//        url: req.url,
//      },
//      action: ACTIONS.EDIT_LOAN_ACTION,
//      user: req.user,
//      loan
//    });

//   return res.send({
//     success:true , data:{
//       loan
//     }
//   })

  
//   }
  
  
// }



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




