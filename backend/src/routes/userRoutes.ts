import express from "express";
import * as Usercontroller  from '@controllers/UserController' ;
import { body } from "express-validator"; 
import { validate } from "@middlewares/validate";
import { Auth } from "@middlewares/Auth";


const Router =  express.Router()  ;

Router.route("/api/user/auth/userlogin").post(
  [
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
    body("password").notEmpty().isLength({ min: 8, max: 100 }),
  ],validate ,
  Usercontroller.login
); 


Router.route("/api/user/auth/create").post(Usercontroller.createUser)

Router.route("/api/user/auth/verifyotp").post(
  [
    body("otp").notEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
  ],
  validate,
  Usercontroller.verifyOtp
); 

Router.route("/api/user/auth/mobileverifyotp").post(
  [
    body("otp").notEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
  ],
  validate,
  Usercontroller.verifyMobileOtp
); 


Router.route("/api/user/auth/resendotp").post(
  [body("phoneNumber").isMobilePhone("en-GH").notEmpty()],
  validate,
  Usercontroller.resendOtp
);


Router.route("/api/user/auth/requestaccess")
.get(Usercontroller.requestAcceessToken) 

Router.route("/api/user/auth/requestmobileaceess")
.get(Usercontroller.requestMobileAccessToken)

Router.route("/api/user/auth/resetpassword").post(
  [
    body("password")
      .notEmpty()
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 }),

    body("oldPassword")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 }),
  ],
  validate, Auth ,
  Usercontroller.resetPassword
); 
Router.route("/api/user/auth/forgotpassword").post(
  [body("phoneNumber").isMobilePhone("en-GH").notEmpty()],
  validate,
  Usercontroller.forgotPassword
); 
Router.route("/api/user/auth/verifypasswordotp").post(
  [
    body("otp").notEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
  ],
  validate,
  Usercontroller.verifyforgotPasswordOtp
);
Router.route("/api/user/auth/changepassword").post(
  [
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 }),
    body("confirmPassword")
      .isLength({ max: 8 })
      .custom((value: string, { req }) => {
        if (value !== req.body.password) {
          throw new Error("passwords do not match");
        }

        return true;
      }),
  ],
  validate,
  Usercontroller.changePassword
);





export  {Router as userRouter} ; 