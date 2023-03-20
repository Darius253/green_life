import  express from 'express';
import  {login,mobileLogin,requestAccessToken,requestAccessTokenMobile,signup} from '@controllers/userController';
import {body} from 'express-validator'
const Router = express.Router();


Router.route("/api/auth/login")
.post([
 body("email").notEmpty().normalizeEmail() , 
 body("password").notEmpty()

]  , login)


Router.route("/api/auth/signup")
.post([
body("name").notEmpty().isLength({min:4 , max:16}).trim().escape()  ,
body("email").isEmail().normalizeEmail() , 
body("phoneNumber").isMobilePhone("en-GH").notEmpty() , 
body("password").notEmpty().trim().isStrongPassword({
    minLength:8 ,
    minUppercase:1 ,
    minSymbols:1 ,
    minNumbers:1
})
]  , signup)


Router.route("/api/auth/mobileLogin").post(
  [body("email").notEmpty().normalizeEmail(), body("password").notEmpty()],
  mobileLogin
);


Router.route("/api/auth/requestMobile")
.get(requestAccessTokenMobile) 

Router.route("/api/auth/request").get(requestAccessToken); 

export  {Router  as UserRouter};