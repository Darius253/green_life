import { register } from '@controllers/registrationController';
import { Auth } from '@middlewares/Auth';
import express from 'express' ; 
const Router =  express.Router(); 


Router.route("/api/users/register")
.post( Auth, register)




export  {Router  as registrationRouter} ; 