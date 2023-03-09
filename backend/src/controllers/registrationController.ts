import  {Request , Response} from 'express'
import  {Registration} from  '@models/Registration' ; 
import { User } from '@models/User';


export const register  =async (req:Request , res:Response) => {
    

 //register user
const registration =  new Registration(req.body) ; 


await registration.save(); 
 
//update user
// const user =  await User.findById()
 

res.status(201).send({
    success:true , data:{
        registration
    }
}) ; 






}