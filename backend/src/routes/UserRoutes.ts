import  express from 'express';
import  {login,signup} from '@controllers/userController';
const Router = express.Router();


Router.route("/api/auth/login")
.post(login)


Router.route("/api/auth/signup")
.post(signup)



export  {Router  as UserRouter};