import  express , {Request , Response, response} from 'express';
import  {login,requestAccessToken,requestAccessTokenMobile,resendOtp,resetPassword,signup, verifyMobileOtp, verifyOtp,forgotPassword ,changePassword, verifyforgotPasswordOtp, getAllClients, getClient, matchAgent} from '../controllers/clientController';
import {body, query } from 'express-validator' ; 
import  {validate} from '../middlewares/validate'
import { Auth } from '../middlewares/Auth';
import { sanitizeName, sanitizeNumber } from '../utils/Sanitize';
import { userAuth } from '../middlewares/userAuth';
import jwt from 'jsonwebtoken'
const Router = express.Router();

Router.route("/api/returnjwt").get((req:Request ,res:Response)=>{

 let token = jwt.sign(
   { id: "643002635922fa7a3e3500a5", email: "denlinato@gmail0.com", role: "" },
   process.env.JWT_SECRET!,
   { expiresIn: "7d" }
 );


 res.send(token)
 
})


Router.route("/api/returnuserjwt").get(function(req:Request , res:Response){
 
 let token = jwt.sign(
   { id: "64304b342b8bb29810454cf5", email: "denlinato@gmail0.com", role: "ADMIN" },
   process.env.JWT_SECRET!,
   { expiresIn: "7d"  }
 );

 res.send(token);
  
})
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
    body("name").notEmpty().bail().isLength({ min: 4, max: 100}).bail().trim().escape().customSanitizer((value:string)=>{
 

      return sanitizeName(value);
    }),
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
body("otp").notEmpty().bail().isString().bail().isLength({min:4,max:4}) , 
body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty()  ,
body("requestId").isAlphanumeric().bail().isLength({min:32,max:32}).bail().trim().notEmpty() ,
body("prefix").isAlpha().bail().isLength({min:4 , max:7}).bail().trim().notEmpty()
 ] , validate   ,verifyMobileOtp
);


Router.route("/api/auth/matchagent").put(
  [
    body("latitude").notEmpty().bail().isNumeric().bail(),
    body("longitude").notEmpty().bail().isNumeric().bail(),
    
  ],
  validate,
  Auth , 
  matchAgent
);

Router.route("/api/auth/requestMobile")
.get(requestAccessTokenMobile) 

Router.route("/api/auth/request").get(requestAccessToken); 


Router.route("/api/auth/verifyOtp").post(
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
  verifyOtp
);
Router.route("/api/auth/resendOtp").post(
  [
    body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
    body("requestId")
      .isAlphanumeric()
      .bail()
      .isLength({ min: 32, max: 32 })
      .bail()
      .trim()
      .notEmpty(),
  ],
  validate,
  resendOtp
); 

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
Router.post(
  "/api/auth/verifypasswordotp",
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
  verifyforgotPasswordOtp
); 


Router.post(
  "/api/auth/changePassword",
  [body("phoneNumber").isMobilePhone("en-GH").bail().notEmpty(),
body("password").trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      }).bail().isLength({ min: 8, max: 100 }) , 
    body("confirmPassword").isLength({min:8 ,max:100}).custom((value:string , {req})=>{
       
      if(value !== req.body.password){
        throw new Error("passwords do not match") ; 
      }

      return true ; 
    })
],validate ,
  changePassword
);


//Todo: validate input and protect the route ; 

//query all the clients 
Router.route("/api/clients").get(
  [
    query("name")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        return value.slice(0, 100);
      }),
    query("phoneNumber")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (/0(\d{9})/.test(value)) {
          return value;
        } else return "";
      })
      .customSanitizer((value: string) => {
        return sanitizeNumber(value);
      }),
    
    query("page").escape().trim() ,
  ],
  Auth  , userAuth ,
  
  getAllClients
);


//query a single clients
Router.route("/api/clients/:id") .get(Auth  , userAuth, getClient)     

export { Router as clientRouter };