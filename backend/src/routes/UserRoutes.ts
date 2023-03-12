import  express from 'express';
// import  {login,mobileLogin,requestAccessToken,requestAccessTokenMobile,signup} from '@controllers/userController';
import  {login,mobileLogin,requestAccessToken,requestAccessTokenMobile,signup} from '../controllers/userController';
const Router = express.Router();


Router.route("/api/auth/login")
.post(login)


Router.route("/api/auth/signup")
.post(signup)


Router.route("/api/auth/mobileLogin")
.post(mobileLogin)


Router.route("/api/auth/requestMobile")
.get(requestAccessTokenMobile) 

Router.route("/api/auth/request").get(requestAccessToken); 

export  {Router  as UserRouter};