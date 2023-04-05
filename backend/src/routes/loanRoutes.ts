import  express  , {NextFunction, Request , Response}from 'express' ; 
import {requestPersonalLoan ,createPersonalLoanRequest} from '../controllers/loanController'
import {upload} from '../middlewares/uploads'
import { Auth } from '../middlewares/Auth';
import  {body, validationResult} from 'express-validator'
import { validate } from '../middlewares/validate';
import { ValidationErrors } from '../utils/validationError';
import { personalLoanService } from '../services/personalLoanService';
import { isRegionalAgent } from '../middlewares/userAuth';

const Router=  express.Router() ;



Router.route("/api/loan/request").post(

  Auth,
  upload.fields([
    { name: "face", maxCount: 1 },
    { name: "ghanaCardFront", maxCount: 1 },
    { name: "ghanaCardBack", maxCount: 1 },
  ]),
  [
    body("principal").isNumeric().custom((value)=>{
       

      if(value<0){
        throw new Error("value cannot be negative") ;
      }

      return true
    }),
     body("interestrate").isNumeric().custom((value)=>{
       

      if(value<0){
       throw new Error("value cannot be negative") ;
      }

      return true
    }) ,
     body("loanterm").isNumeric().custom((value)=>{
       

      if(value<0){
    throw new Error("value cannot be negative") ;
      }

      return true
    })

    // async function (req: Request, res: Response, next: NextFunction) {
    //   console.log(req.body);

    //   if (req.body.password) {
    //     await body("email").notEmpty().run(req);
    //   }
    //   // const errors = validationResult(req);
    //   // if (!errors.isEmpty()) {
    //   //   throw new ValidationErrors(errors.array());
    //   // }

    //   next();
    // },
  ],validate ,
  
  requestPersonalLoan
);

Router.route("/api/loan/reject").patch(Auth,personalLoanService.rejectRequest)  ;
Router.route("/api/loan/accept").patch(Auth ,personalLoanService.acceptloan) 
Router.route("/api/loan/deny").patch(Auth,isRegionalAgent ,  personalLoanService.denyloan) ; 
Router.route("api/loan/approve").patch(Auth , isRegionalAgent , personalLoanService.approveRequest);


Router.route("/api/createloan").post(createPersonalLoanRequest); 




export {Router as loanRouter} ; 
