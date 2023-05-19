import { BadAuthError } from '../utils/BadAuthError';
import {Request , Response} from 'express' ; 
import {policyRepo} from  '../models/Policy'
import { ACTIONS } from 'actions';
import { logger } from '@utils/logger';


 class Policyservice {
  async createPolicy(req: Request, res: Response) {
 
 const policyexist = await  policyRepo.search().returnFirst() ; 

 if(policyexist){
    throw new BadAuthError("A policy already exist" , 403 , ACTIONS.CREATE_POLICY_ATTEMPTS) ;
 }

let policy = await  policyRepo.createEntity() ; 

 const { interestRate ,
  noRegisterationAmountCap ,
  noGurantorAmountCap ,
  personalloanAmountCap ,
  personalloanterm} =  req.body;
 
 policy.interestRate =  interestRate || 0 ; 
 policy.noRegisterationAmountCap=  noRegisterationAmountCap || 0 ;
 policy.personalloanAmountCap=  personalloanAmountCap || 0 ;
 policy.personalloanterm =  personalloanterm  || 1 ;
 policy.noGurantorAmountCap =  noGurantorAmountCap || 0;


 let id=  await policyRepo.save(policy) ; 
console.log(policy) ;
console.log(await policyRepo.search().return)
 let newPolicy =  await policyRepo.fetch(id) ; 

 logger.info({
   device: {
     ip: req.ip,
     agent: req.headers["user-agent"],
     method: req.method,
     url: req.url,
   },
   action: ACTIONS.CREATE_POLICY_ACTION,
   user: req.user,
   policy,
 });

 return res.status(200).send({
    success:true , data:{
        newPolicy
    }
 })


  }

 async editPolicy(req: Request, res: Response) {


const {
  interestRate,
  noRegisterationAmountCap,
  noGurantorAmountCap,
  personalloanAmountCap,
  personalloanterm,
} = req.body;

let policy = await policyRepo.fetch(req.params.id);

if(!policy){
    throw new BadAuthError("policy not found" , 404 ,ACTIONS.EDIT_POLICY_ATTEMPTS) ;
}

policy.interestRate = interestRate || 0;
policy.noRegisterationAmountCap = noRegisterationAmountCap || 0;
policy.personalloanAmountCap = personalloanAmountCap || 0;
policy.personalloanterm = personalloanterm || 1;
policy.noGurantorAmountCap = noGurantorAmountCap || 0;

let id = await policyRepo.save(policy);
console.log(policy);
console.log(await policyRepo.search().return);
let newPolicy = await policyRepo.fetch(id);

logger.info({
  device: {
    ip: req.ip,
    agent: req.headers["user-agent"],
    method: req.method,
    url: req.url,
  },
  action: ACTIONS.EDIT_POLICY_ACTION,
  user: req.user,
  policy,
});

return res.status(200).send({
  success: true,
  data: {
    newPolicy,
  },
});
}

  async getPolicy(req: Request, res: Response) {
       
let policy=  await policyRepo.search().returnFirst()
    
  if(!policy){

    throw new Error("")
  }

  
 return  res.send({
    success:true , data:{
        policy
    }
  })

  }
}




export const Pol = new Policyservice() ; 


