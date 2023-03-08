import  {Request , Response} from 'express'
import  {Registration} from  '@models/Registration' ; 
 


export const register  =async (req:Request , res:Response) => {
     
const registration =  new Registration(req.body) ; 


await registration.save(); 



res.status(201).send({
    success:true , data:{
        registration
    }
}) ; 






}