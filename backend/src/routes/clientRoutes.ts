import  express from 'express';
import  {login,requestAccessToken,requestAccessTokenMobile,resendOtp,resetPassword,signup, verifyMobileOtp, verifyOtp,forgotPassword ,changePassword, verifyforgotPasswordOtp} from '../controllers/clientController';
import {body} from 'express-validator' ; 
import  {validate} from '../middlewares/validate'
import { Auth } from '../middlewares/Auth';
const Router = express.Router();


Router.route("/api/auth/login").post(
  [
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
    body("password").notEmpty().isLength({ min: 8, max: 100 }),
  ],
  validate,
  login
);


Router.route("/api/auth/signup").post(
  [
    body("name").notEmpty().bail().isLength({ min: 4, max: 100}).bail().trim().escape(),
    body("email").isEmail().bail().normalizeEmail(),
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("password")
      .notEmpty().bail()
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      }).bail()
      .isLength({ min: 8, max: 100 }),
    body("confirmpassword")
      .notEmpty().bail()
      .trim()
      .isLength({ min: 8, max: 100 }).bail().custom((value:string , {req})=>{

        if(req.body.password !== value){
          throw new Error("passwords do not match") ; 
        }

        return true;
      })
  ],
  validate,
  signup
);


Router.route("/api/auth/verifymobileotp").post(
 [
body("otp").notEmpty().bail().isNumeric().bail().isLength({min:6,max:6}) , 
body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty()  
 ] , validate   ,verifyMobileOtp
);


Router.route("/api/auth/requestMobile")
.get(requestAccessTokenMobile) 

Router.route("/api/auth/request").get(requestAccessToken); 


Router.route("/api/auth/verifyOtp").post(
  [
    body("otp").notEmpty().bail().isNumeric().isLength({ min: 6, max: 6 }),
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
  ],validate ,
  verifyOtp
);
Router.route("/api/auth/resendOtp").post( 
   [  body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
  ],validate ,
   resendOtp); 

//reset current password
Router.route("/api/client/resetPassword").post([
 
  body("password").notEmpty()
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 }) ,
  
      body("oldPassword").trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 })
      
] ,validate , Auth,  resetPassword) ;


//forgot password
Router.post(
  "/api/auth/forgotPassword",
  [body("phoneNumber").isMobilePhone("en-GH").notEmpty()],
  validate,
  forgotPassword
); 
Router.post("/api/auth/verifypasswordotp" , [
    body("otp").notEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
  ],validate , verifyforgotPasswordOtp) ; 


Router.post(
  "/api/auth/changePassword",
  [body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
body("password").trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .isLength({ min: 8, max: 100 }) , 
    body("confirmPassword").isLength({min:8 ,max:100}).custom((value:string , {req})=>{
       
      if(value !== req.body.password){
        throw new Error("passwords do not match") ; 
      }

      return true ; 
    })
],validate ,
  changePassword
);
export  {Router  as clientRouter};

//Todo: validate input and protect the route ; 