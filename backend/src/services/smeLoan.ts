import  {Request , Response} from 'express' ;
import  {LoanService} from './loanService'
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {checkSmeReg , checkexec} from '../utils/checkReg' ;
import { BadAuthError } from '../utils/BadAuthError';
import { Client } from '../models/Client';
import  {Registration} from '../models/Registration'
import { LOANTYPE, guarantorRole, loanStatus } from '../models/models.interface';
import { Loan } from '../models/Loan';
import { Guarantor } from '../models/Guarantor';
import { hubtelService } from "./huntelService";
import { returnAppMessage, returnMessage } from "../utils/message";
import { ACTIONS } from '../actions';

export class  SmeLoan extends LoanService{
    
  
 async   createRequest(req: Request, res: Response){
         
    
    await checkSmeReg(req) ; 

    await checkexec(req) ; 

const obj = {
  face: "face",
  ghanaCardBack: "ghanaCardBack",
  ghanaCardFront: "ghanaCardFront",
  businessCertificate: "businessCertificate",
  form3: "form3",
  municipalCertificate: "municipalCertificate",
  taxReturns: "taxReturns",
  bankStatement: "bankStatement",
  financialStatement: "taxReturns",
};
 
//@ts-ignore
console.log(req.files)
 
for(let keys in obj){
  //@ts-ignore
  if (!req.files[keys]) {
  
    throw new BadAuthError("Bad request error" , 400 ,ACTIONS.REQUEST_SME_LOAN_ATTEMPTS);
  }

  //@ts-ignore
  obj[keys] = req.files[keys][0]["path"];
}
   console.log(obj);

const user =  await Client.findById(req.user.id) ; 

if(!user){
  throw new BadAuthError(
    "not authorized",
    401,
    ACTIONS.REQUEST_SME_LOAN_ATTEMPTS
  );
}

 
const registration =  await  new Registration({
 
  ...req.body  ,
  ...obj ,
  user: user._id
 
}).save() ;


const loan =  await new Loan({

  principal: +req.body.principal , 
  loanterm : +req.body.loanterm , 
  interestrate:+req.body.interestrate ,
   loanType:LOANTYPE.SMELOAN , 
   client : user._id
}).save() 


const beneficialOwners = [] ;
const shareholders =[]  ;
const directors = []

console.log(req.body)
for(let i = 1 ; i<=  registration.numberofBeneficialOwners ; i++ ){
     console.log(req.body[`beneficialOwner${i}phoneNumber`]);
  beneficialOwners.push({
    FullName: req.body[`beneficialOwner${i}fullname`],
    phoneNumber: req.body[`beneficialOwner${i}phoneNumber`],
    role: guarantorRole.BENEFICIALOWNERS,
    Loan: loan,
  }); 
}
for (let i = 1; i <= registration.numberofDirectors; i++) {
directors.push({
  FullName: req.body[`directors${i}fullname`],
  phoneNumber: req.body[`directors${i}phoneNumber`],
  role: guarantorRole.DIRECTOR,
  Loan: loan,
});
}
for (let i = 1; i <= registration.numberofShareHolders; i++) {
 shareholders.push({
   FullName: req.body[`shareHolders${i}fullname`],
   phoneNumber: req.body[`shareHolders${i}phoneNumber`],
   role: guarantorRole.SHAREHOLDER,
   Loan: loan,
 });
}
console.log(shareholders) ;
console.log(directors ) ;
console.log(beneficialOwners)
await  Guarantor.create(shareholders); 
await Guarantor.create(directors); 
await Guarantor.create(beneficialOwners) ;





 
 
    await hubtelService.sendMessage({
      to: user.phoneNumber,
      from: "buddybuss",
      content: returnAppMessage(
        loan._id.toString(),
        loan.principal.toFixed(2)
      ).toUpperCase(),
    });
 
 

return res.send({
  success:true  ,data:{
    loan
  }
}) ;


    } 

async acceptloan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
    
}

async denyloan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
    

}

async rejectRequest(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
    
}

async approveRequest(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
    
}


async  agentCreateRequest(req:Request , res:Response){
   
    await checkSmeReg(req);

    await checkexec(req);

    const obj = {
      face: "face",
      ghanaCardBack: "ghanaCardBack",
      ghanaCardFront: "ghanaCardFront",
      businessCertificate: "businessCertificate",
      form3: "form3",
      municipalCertificate: "municipalCertificate",
      taxReturns: "taxReturns",
      bankStatement: "bankStatement",
      financialStatement: "taxReturns",
    };

    //@ts-ignore
    console.log(req.files);

    for (let keys in obj) {
      //@ts-ignore
      if (!req.files[keys]) {
        throw new BadAuthError(
          "Bad request error",
          400,
          ACTIONS.REQUEST_SME_LOAN_ATTEMPTS
        );
      }

      //@ts-ignore
      obj[keys] = req.files[keys][0]["path"];
    }
    console.log(obj);

    const user = await Client.findById(req.params.id);

    if (!user) {
      throw new BadAuthError(
        "not authorized",
        401,
        ACTIONS.REQUEST_SME_LOAN_ATTEMPTS
      );
    }

    const registration = await new Registration({
      ...req.body,
      ...obj,
      user: user._id,
    }).save();

    const loan = await new Loan({
      principal: +req.body.principal,
      loanterm: +req.body.loanterm,
      interestrate: +req.body.interestrate,
      loanType: LOANTYPE.SMELOAN,
      client: user._id,
      clientAgent:req.user.id
    }).save();

    const beneficialOwners = [];
    const shareholders = [];
    const directors = [];

    console.log(req.body);
    for (let i = 1; i <= registration.numberofBeneficialOwners; i++) {
      console.log(req.body[`beneficialOwner${i}phoneNumber`]);
      beneficialOwners.push({
        FullName: req.body[`beneficialOwner${i}fullname`],
        phoneNumber: req.body[`beneficialOwner${i}phoneNumber`],
        role: guarantorRole.BENEFICIALOWNERS,
        Loan: loan,
      });
    }
    for (let i = 1; i <= registration.numberofDirectors; i++) {
      directors.push({
        FullName: req.body[`directors${i}fullname`],
        phoneNumber: req.body[`directors${i}phoneNumber`],
        role: guarantorRole.DIRECTOR,
        Loan: loan,
      });
    }
    for (let i = 1; i <= registration.numberofShareHolders; i++) {
      shareholders.push({
        FullName: req.body[`shareHolders${i}fullname`],
        phoneNumber: req.body[`shareHolders${i}phoneNumber`],
        role: guarantorRole.SHAREHOLDER,
        Loan: loan,
      });
    }
    console.log(shareholders);
    console.log(directors);
    console.log(beneficialOwners);
    await Guarantor.create(shareholders);
    await Guarantor.create(directors);
    await Guarantor.create(beneficialOwners);

    await hubtelService.sendMessage({
      to: user.phoneNumber,
      from: "buddybuss",
      content: returnAppMessage(
        loan._id.toString(),
        loan.principal.toFixed(2)
      ).toUpperCase(),
    });

    return res.send({
      success: true,
      data: {
        loan,
      },
    });
}
}

export const smeLoanService =  new SmeLoan() ;