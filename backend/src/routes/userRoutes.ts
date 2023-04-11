import express from "express";
import * as Usercontroller  from '../controllers/UserController' ;
import { body, param, query } from "express-validator"; 
import { validate } from "../middlewares/validate";
import { Auth } from "../middlewares/Auth";
import { sanitizeName  , sanitizeNumber} from "@utils/Sanitize";
import { userRole } from "@models/models.interface";
import mongoose from "mongoose";
import { isRegionalAgent } from "@middlewares/userAuth";


const Router =  express.Router()  ;


Router.route("/api/user/auth/create").post(Usercontroller.createUser)
Router.route("/api/user/auth/userlogin").post(
  [
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("password").notEmpty().bail().isLength({ min: 8, max: 100 }),
  ],validate ,
  Usercontroller.login
); 


Router.route("/api/user/auth/create").post(Usercontroller.createUser)

Router.route("/api/user/auth/verifyotp").post(
  [
    body("otp")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 4, max: 4 }),
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("requestId")
      .isAlphanumeric()
      .bail()
      .isLength({ min: 32, max: 32 })
      .bail()
      .trim()
      .notEmpty(),
    body("prefix")
      .isAlpha()
      .bail()
      .isLength({ min: 4, max: 7 })
      .bail()
      .trim()
      .notEmpty(),
  ],
  validate,
  Usercontroller.verifyOtp
); 

Router.route("/api/user/auth/mobileverifyotp").post(
  [
    body("otp")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 4, max: 4 }),
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("requestId")
      .isAlphanumeric()
      .bail()
      .isLength({ min: 32, max: 32 })
      .bail()
      .trim()
      .notEmpty(),
    body("prefix")
      .isAlpha()
      .bail()
      .isLength({ min: 4, max: 7 })
      .bail()
      .trim()
      .notEmpty(),
  ],
  validate,
  Usercontroller.verifyMobileOtp
); 


Router.route("/api/user/auth/resendotp").post(
  body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
  body("requestId")
    .isAlphanumeric()
    .bail()
    .isLength({ min: 32, max: 32 })
    .bail()
    .trim()
    .notEmpty(),
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
      .notEmpty().bail()
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
    body("otp")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 4, max: 4 }),
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("requestId")
      .isAlphanumeric()
      .bail()
      .isLength({ min: 32, max: 32 })
      .bail()
      .trim()
      .notEmpty(),
    body("prefix")
      .isAlpha()
      .bail()
      .isLength({ min: 4, max: 7 })
      .bail()
      .trim()
      .notEmpty(),
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



//query all the users=admin 
Router.route("/api/users/").get(
  [Auth , isRegionalAgent ,
    query("name")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        return value.slice(0, 101);
      })
      .customSanitizer((value: string) => {
        return  sanitizeName(value);
      }),
    query("limit").escape().trim(),
    query("role")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        //@ts-ignore
        if (Object.values(userRole).includes(value)) {
          return value;
        } else {
          return ;
        }
      })
  ],
  Usercontroller.getAllusers
);

//query a single user 
Router.route("/api/users/:id").get(Auth ,isRegionalAgent , Usercontroller.getUser)

//block a user
Router.route("/api/users/block/:id")


export  {Router as userRouter} ; 