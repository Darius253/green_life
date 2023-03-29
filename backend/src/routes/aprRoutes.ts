import express from 'express' ; 
import  {body} from 'express-validator' ;
import * as policyContoller from '@controllers/policyController' ;
import { validate } from '@middlewares/validate';
const Router = express.Router() ; 



Router.route("/api/loan/policy")
.post(policyContoller.create)
.get(policyContoller.get) 


Router.route("/api/loan/policy/:id")
.post(policyContoller.edit)





export {Router  as policyRouter} ;