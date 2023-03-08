import { register } from '@controllers/registrationController';
import express from 'express' ; 
const Router =  express.Router(); 


Router.route("/api/users/register")
.post(register)




export  {Router  as registrationRouter} ; 