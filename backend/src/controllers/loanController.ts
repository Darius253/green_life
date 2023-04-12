import  {Request , Response} from  'express' ;
import { policyRepo } from 'redisClient';
// import  {personalLoanService} from '@services/personalLoanService'
import  {personalLoanService} from '../services/personalLoanService'
import { Loan } from '@models/Loan';
import  {smeLoanService} from '../services/smeLoan';
import { BadAuthError } from '@utils/BadAuthError';
import { retLimit, retQuery } from '@utils/Sanitize';
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



export const getAllLoans= async (req:Request ,res:Response)=>{
  
    const filter:{
        loanType?:string ;
        principal?:any
    }= {}
const limit = retLimit(req.query)



retQuery(req.query , filter) ;

   console.log(filter) ; 


   const loans =  await Loan.find(filter).limit(limit) ;
   res.send({
  success:true , data:{
    loans
  }


   })

} ;


export const getLoan  = async (req:Request , res:Response)=>{
 
    const loan  =   await Loan.findById(req.params.id).populate("client").populate("clientAgent") ;

    if(!loan){
        throw new BadAuthError("loan not found" , 404) ;
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
  client?:string
} = {};
const limit = retLimit(req.query);

retQuery(req.query, filter);

filter["client"] =  req.params.id ; 

console.log(filter)

const loans =  await Loan.find(filter).limit(limit) ; 


 
res.send({
    success:true , data:{
        loans
    }
})
    
}






//agent

export const getAgentLoans =async (req: Request, res: Response) => {
const filter: {
  loantype?: string;
  principal?: any;
  clientAgent?:string
} = {};
const limit = retLimit(req.query);

retQuery(req.query, filter);

filter["clientAgent"] =  req.params.id ; 

console.log(223)

 const loans = await Loan.find(filter).limit(limit).populate("client") ; 

 res.send({
    success:true , data:{
        loans
    }
 })

};


export const getAgentLoan = async(req: Request, res: Response) => {

const loan =  await Loan.findOne({_id:req.params.id , clientAgent:req.user.id}).populate("client") ; 

   if (!loan) {
     throw new BadAuthError("loan not found", 404);
   }

console.log(22)

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
 const limit = retLimit(req.query);

 retQuery(req.query, filter);

 filter["client"] = req.user.id;
console.log(filter) ;
 const loans = await Loan.find(filter).limit(limit);

 res.send({
   success: true,
   data: {
     loans,
   },
 });
    // const loans =  await Loa


};


export const getclientLoan = async(req: Request, res: Response) => {

 
    const loans=  await Loan.findById(req.params.id).populate("clientAgent") ; 

    
    if(!loans){
        throw new BadAuthError("loan not found" , 404);
    }

    if(loans.client._id.toString() !== req.user.id){

        throw new BadAuthError("user not authorized" , 401) ;
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