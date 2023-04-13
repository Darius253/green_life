import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { BadAuthError } from "../utils/BadAuthError";
import { compare } from "bcrypt";
import { Auth } from "../services/authService";
import { Iuser } from "../models/models.interface";
import { Userservice } from "../services/userService";

const Usercontroller = new Auth<Iuser>();
const userController =   new Userservice() ;
//controller for admin login

export const createUser = async (req: Request, res: Response) => {
  const { FullName, email, password, phoneNumber } = req.body;

  const user =new User({
    FullName,
    email,
    password,
    phoneNumber,
   
    otpLock: {
      otpTries: 0,
    },
    lock: {
      tries: 0,
    },
  });

  await user.save();

  res.send({
   data:{
    otp:user.otp ,
    phoneNumber: user.phoneNumber
   }
  });
};
export const login = async (req: Request, res: Response) => {
  return Usercontroller.login(req, res, User);
};

//req.body = {userid , otp} find user using the userid , and verify the otp sent with the otp attached to the user
//if it is correct send a token  else send an error
export const verifyOtp = (req: Request, res: Response) => {
  return Usercontroller.verifyOtp(req, res, User);
};

export const verifyMobileOtp = (req: Request, res: Response) => {
  return Usercontroller.verifyMobileOtp(req, res, User);
};

export const resendOtp = (req: Request, res: Response) => {
  return Usercontroller.resendOtp(req, res, User);
};

export const requestAcceessToken = (req: Request, res: Response) => {
  return Usercontroller.requestAcceessToken(req, res, User);
};

export const requestMobileAccessToken = (req: Request, res: Response) => {
  return Usercontroller.requestAcceessToken(req, res, User);
};

export const resetPassword = (req:Request , res:Response)=>{

return Usercontroller.resetPassword(req ,res, User);
}

export const forgotPassword  = (req:Request , res:Response)=>{

  return Usercontroller.forgotPassword(req ,res ,User) ;
}

export const verifyforgotPasswordOtp = (req: Request, res: Response) => {
  return Usercontroller.verifyforgotPasswordOtp(req ,res, User);
};


export const changePassword = (req:Request , res:Response)=>{

  return Usercontroller.changePassword(req ,res ,User) ;
}
   

export const getAllusers = (req:Request, res:Response)=>{


  return  userController.getAllusers(req , res) ; 
  

  
}


export const getUser = (req:Request ,res:Response)=>{


  return  userController.getUser(req , res);
}
