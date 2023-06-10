import  {Request , Response} from  'express' ;
// import { policyRepo } from 'redisClient';
// import  {personalLoanService} from '@services/personalLoanService'
import  {personalLoanService} from '../services/personalLoanService'
import { Loan } from '../models/Loan';
import  {smeLoanService} from '../services/smeLoan';
import { BadAuthError } from '../utils/BadAuthError';
import { retLimit, retQuery } from '../utils/Sanitize';
import { logger } from '../utils/logger';
import { ACTIONS } from '../actions';
import { loanInstallmentStatus, loanStatus } from '@models/models.interface';
import moment from 'moment';
import { Payment } from '@models/payment';

export const requestPersonalLoan =async (req:Request , res:Response)=>{

return personalLoanService.createRequest(req ,res) ;

}


export const  acceptPersonalLoanRequest =  async(req:Request , res:Response)=>{

    return personalLoanService.acceptloan(req , res);

}

export const rejectPersonalLoanRequest =  async(req:Request , res:Response)=>{
    return personalLoanService.rejectRequest(req , res) ;
}

export const denyPersonalLoanRequest =  async(req:Request , res:Response)=>{

    return personalLoanService.denyloan(req , res);
}

export const approvePersonalLoanRequest= async(req:Request , res:Response)=>{

    return personalLoanService.approveRequest(req , res);
}


export const agentCreatePersonalloanRequest = async (
  req: Request,
  res: Response
) => {
  return personalLoanService.agentCreateRequest(req ,res)
};


export const repayment = async(req:Request ,res:Response)=>{

  return personalLoanService.repaymentRequest(req ,res) ;
}

export const repaymentHook = async (req:Request , res:Response) => {
  const { paymentType, amount, clientReference } = req.body;

  const loan = await Loan.findById(clientReference);

  if (!loan || loan.loanStatus !== loanStatus.INPROGRESS) {
    throw new Error("loan repaymenthook failed");
  }
  let currentInstallment = loan.installment[loan.installment.length - 1];

  if (amount <= currentInstallment.amount) { 
      
      currentInstallment.remainingBalance -= amount;
    currentInstallment.lastPaymentDate = moment().toDate();

    if (currentInstallment.status === loanInstallmentStatus.DEFAULTED) {
      currentInstallment.latePayment = true;
    }
     
     if(amount ===  currentInstallment.amount){
         
      loan.installment.push({
 amount : loan.monthlyPayment  ,
 dueDate: moment(currentInstallment.dueDate).add(1,'m').toDate() ,
 remainingBalance : loan.monthlyPayment  , 
 status : loanInstallmentStatus.UNPAID  ,
 latePayment : false , 
 lastPaymentDate:  moment().toDate()
      })

      currentInstallment.status = loanInstallmentStatus.SETTLED ;
     }

  } else  {

       
     let x = amount - currentInstallment.remainingBalance;
      currentInstallment.remainingBalance  = 0
      currentInstallment.lastPaymentDate = moment().toDate();

      if (currentInstallment.status === loanInstallmentStatus.DEFAULTED) {
        currentInstallment.latePayment = true;
      }

      currentInstallment.status =  loanInstallmentStatus.SETTLED ;
 
      let i =1 ;
       while(x > 0 && loan.installment.length <  loan.loanterm){
      
      loan.installment.push({
        amount: loan.monthlyPayment,
        dueDate: moment(currentInstallment.dueDate).add(i, "m").toDate(),
        remainingBalance: x > loan.monthlyPayment  ?  0 :  loan.monthlyPayment - x,
        status: loanInstallmentStatus.UNPAID,
        latePayment: false,
        lastPaymentDate: moment().toDate(),
      });
      
      i++;
      x-= loan.monthlyPayment ;
     
       }
 


  }

  loan.remainingBalance  -=amount;
 
  loan.lastRepaymentDate=  moment().toDate();
  
  if (loan.remainingBalance <= 0) {
    //settle loan ;
    loan.loanStatus =  loanStatus.SETTLED ;

  }

 

 
  const payment =  await new Payment({
    loan: loan , 
    paymentType , 
    amount
  }).save()

         
  res.send({
    success:true
  })



  //change lastrepaymentdate ;]
}
export const getAllLoans= async (req:Request ,res:Response)=>{
  console.log(req.query)
    const filter:{
        loanType?:string ;
        principal?:any
    }= {}
const limit = 10
const page =  retLimit(req.query["page"])


retQuery(req.query , filter) ;

   console.log(filter) ; 
    

   const count = await Loan.find(filter).countDocuments() ;   
   const loans =  await Loan.find(filter).skip((page-1)*limit).limit(limit) ;
    
   logger.info({
      device: {
        ip: req.ip,
        agent: req.headers["user-agent"],
        method: req.method,
        url: req.url,
      },
      action: ACTIONS.FETCH_ALL_LOAN_ACTION,
      user: req.user,
    });
   
   res.send({
  success:true , data:{
    loans , count
  }


   })

} ;


export const getLoan  = async (req:Request , res:Response)=>{
 
    const loan  =   await Loan.findById(req.params.id).populate("client").populate("clientAgent") ;

    if(!loan){
        throw new BadAuthError("loan not found" , 404 , ACTIONS.FETCH_ALL_LOAN_ACTION) ;
    }

 console.log("ewew")
    res.send({
        success:true , data:{
            loan
        }
    })
} 




//export const getuserloan

export const getuserLoans = async(req:Request ,res:Response)=>{
  const filter: {
    loantype?: string;
    principal?: any;
    client?: string;
  } = {};
  const limit = 10;
  const page = retLimit(req.query["page"]);

  retQuery(req.query, filter);

  filter["client"] = req.params.id;

  console.log(filter);

  const count = await Loan.find(filter).countDocuments();
  const loans = await Loan.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  res.send({
    success: true,
    data: {
      loans, count
    },
  });
}






//agent

export const getAgentLoans =async (req: Request, res: Response) => {
  const filter: {
    loantype?: string;
    principal?: any;
    clientAgent:string
  } = {clientAgent:req.params.id};
  const limit = 10;
  const page = retLimit(req.query["page"]);

 
  retQuery(req.query, filter);

 

  console.log(223);

  const count = await Loan.find(filter).countDocuments();
  const loans = await Loan.find(filter)
    .populate('clientAgent')
    .skip((page - 1) * limit)
    .limit(limit);
    

     logger.info({
       device: {
         ip: req.ip,
         agent: req.headers["user-agent"],
         method: req.method,
         url: req.url,
       },
       action: ACTIONS.FETCH_AGENT_LOAN_ATTEMPTS,
       user: req.user,
     });

  res.send({
    success: true,
    data: {
      loans, count
    },
  });
};


export const getAgentLoan = async(req: Request, res: Response) => {

const loan = await Loan.findById(req.params.id ).populate('clientAgent'); 

   if (!loan) {
     throw new BadAuthError("loan not found", 404 , ACTIONS.FETCH_AGENT_LOAN_ATTEMPTS);
   }

  
    if(loan.clientAgent?._id.toString() !== req.user.id) {

    throw new BadAuthError(
      "loan not found",
      404,
      ACTIONS.FETCH_AGENT_LOAN_ATTEMPTS
    );
    }
  
   

console.log(22)

 logger.info({
   device: {
     ip: req.ip,
     agent: req.headers["user-agent"],
     method: req.method,
     url: req.url,
   },
   action: ACTIONS.FETCH_AGENT_LOAN_ATTEMPTS,
   user: req.user,
 });
   res.send({
    success:true , data:{
        loan
    }
   })


};

//user


export const getclientLoans = async(req: Request, res: Response) => {
  const filter: {
    loantype?: string;
    principal?: any;
    client?: string;
  } = {};
  const limit = 10;
  const page = retLimit(req.query["page"]);
  retQuery(req.query, filter);

  filter["client"] = req.user.id;
  console.log(filter);
  const count = await Loan.find(filter).countDocuments();
  const loans = await Loan.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  res.send({
    success: true,
    data: {
      loans,count
    },
  });
  // const loans =  await Loa
};


export const getclientLoan = async(req: Request, res: Response) => {

 
    const loans=  await Loan.findById(req.params.id).populate("clientAgent") ; 

    
    if(!loans){
        throw new BadAuthError("loan not found" , 404 , ACTIONS.FETCH_CLIENT_LOAN_ATTEMPTS);
    }

    if(loans.client._id.toString() !== req.user.id){

        throw new BadAuthError("user not authorized" , 401 , ACTIONS.FETCH_CLIENT_LOAN_ATTEMPTS) ;
    }
    console.log(212)



    res.send({
    success:true , data:{
        loans
    }
    })

};


export const createSmeRequest =  async (req:Request, res:Response)=>{



    return smeLoanService.createRequest(req , res) ;

}

export const agentCreateSmeRequest=  async(req:Request , res:Response)=>{

    return smeLoanService.agentCreateRequest(req, res);
}

export const editLoan  =async (req:Request , res:Response) => {
  
    return personalLoanService.editLoan(req, res)
}