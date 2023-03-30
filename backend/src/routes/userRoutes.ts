import express from "express";
import * as Usercontroller  from '@controllers/UserController' ;
import { body } from "express-validator"; 
import { validate } from "@middlewares/validate";


const Router =  express.Router()  ;

Router.route("/api/user/auth/userlogin").post(
  [
    body("email").notEmpty().normalizeEmail(),
    body("password").notEmpty().isLength({ min: 8, max: 100 }),
  ],validate ,
  Usercontroller.login
); 


Router.route("/api/user/auth/create").post(Usercontroller.createUser)

Router.route("/api/user/auth/verifyotp")
.post(Usercontroller.verifyOtp) ; 

Router.route("/api/user/auth/mobileverifyotp")
.post(Usercontroller.verifyMobileOtp) 


Router.route("/api/user/auth/resendotp")
.post(Usercontroller.resendOtp)


Router.route("/api/user/auth/requestaccess")
.get(Usercontroller.requestAcceessToken) 

Router.route("/api/user/auth/requestmobileaceess")
.get(Usercontroller.requestMobileAccessToken)







export  {Router as userRouter} ; 