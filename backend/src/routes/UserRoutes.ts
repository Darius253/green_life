import  express from 'express';
import  {login,mobileLogin,requestAccessToken,requestAccessTokenMobile,signup} from '@controllers/userController';
import {body} from 'express-validator' ; 
import  {validate} from '@middlewares/validate'
const Router = express.Router();


Router.route("/api/auth/login")
.post([
 body("email").notEmpty().normalizeEmail() , 
 body("password").notEmpty().isLength({min:8 , max:100})

] ,validate , login)


Router.route("/api/auth/signup").post(
  [
    body("name").notEmpty().isLength({ min: 4, max: 100}).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("phoneNumber").isMobilePhone("en-GH").notEmpty(),
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
    body("confirmpassword")
      .notEmpty()
      .trim()
      .isLength({ min: 8, max: 100 }).custom((value:string , {req})=>{

        if(req.body.password !== value){
          throw new Error("passwords do not match") ; 
        }

        return true;
      })
  ],
  validate,
  signup
);


Router.route("/api/auth/mobileLogin").post(
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty().isLength({min:8 ,max:100})],
 validate , mobileLogin
);


Router.route("/api/auth/requestMobile")
.get(requestAccessTokenMobile) 

Router.route("/api/auth/request").get(requestAccessToken); 

export  {Router  as UserRouter};