import  express  , {Request , Response}from 'express' ; 
import {requestPersonalLoan ,createPersonalLoanRequest} from '@controllers/loanController'
import {upload} from '@middlewares/uploads'
import { Auth } from '@middlewares/Auth';
import { validate } from '@middlewares/validate';
import { body } from 'express-validator';
const Router=  express.Router() ;



Router.route("/api/loan/request").post( Auth ,
  upload.fields([
    { name: "face", maxCount: 1 },
    { name: "ghanaCardFront", maxCount: 1 },
    { name: "ghanaCardBack", maxCount: 1 },
  ]),

  requestPersonalLoan
);

Router.route("/api/createloan").post(createPersonalLoanRequest); 




export {Router as loanRouter} ; 
