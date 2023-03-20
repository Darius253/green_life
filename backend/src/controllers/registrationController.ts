import  {Request , Response} from 'express'
import  {Registration} from  '@models/Registration' ; 
import { User } from '@models/User';
import { BadAuthError } from '@utils/BadAuthError';


export const register  =async (req:Request , res:Response) => {
    

 //register user
const registration =  new Registration({...req.body , user:req.user?.id}) ; 


await registration.save(); 
 
//update user
const user =  await User.findById(req.user.id) ; 
   if(!user){
    throw new BadAuthError("user does not exist" , 404);
   }



   user.set("registered", true);
 

res.status(201).send({
    success:true , data:{
        registration,user
    }
}) ; 






}