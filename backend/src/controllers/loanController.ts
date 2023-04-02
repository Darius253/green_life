import  {Request , Response} from  'express' ;
import { policyRepo } from 'redisClient';
// import  {personalLoanService} from '@services/personalLoanService'
import  {personalLoanService} from '../services/personalLoanService'
export const requestPersonalLoan =async (req:Request , res:Response)=>{
//@ts-ignore

return personalLoanService.createRequest(req ,res) ;

}


export const  createPersonalLoanRequest= (req:Request ,res:Response)=>{
 
 
    console.log(req.body)

    res.send("done")
}