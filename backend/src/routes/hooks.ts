import express from 'express' ;
import { repaymentHook } from '../controllers/loanController';
const Router =  express.Router() ;





Router.route("/receivemoney").post(repaymentHook);


// Router.route("/receivemoney/repaymentHook").post(repaymentHook);






export  { Router  as hookRouter}