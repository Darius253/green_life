import {Request , Response}  from 'express';
import {Admin} from '@models/Admin';  
import jwt from 'jsonwebtoken' ; 
import { BadAuthError } from '@utils/BadAuthError';
import  {compare} from 'bcrypt'

//controller for admin login
export const AdminLogin  = async (req:Request ,res:Response)=>{
 
 const  {email  , password} =  req.body ;


///check if admin exists
  const  user =  await Admin.findOne({email}) ; 

  if(!user){
    throw new BadAuthError("wrong email or password" ,  403) ;
  }
 

  const isvalid =  await compare(password , user.password) ; 
 
 //if password is incorrect
  if(!isvalid){
    throw new BadAuthError("wrong emial or password" , 403) ; 
  }


  //send user otp ; 

 
//send token to identify user when verifying otp;   
 
  


  res.send({success:true , data:{
 userId :user._id
  }})




}

//req.body = {userid , otp} find user using the userid , and verify the otp sent with the otp attached to the user
//if it is correct send a token  else send an error
export const verifyOtp  = ()=>{

}