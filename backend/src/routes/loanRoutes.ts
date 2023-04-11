import  express  , {NextFunction, Request , Response}from 'express' ; 
import {acceptPersonalLoanRequest, approvePersonalLoanRequest, denyPersonalLoanRequest, getAllLoans, rejectPersonalLoanRequest, requestPersonalLoan } from '../controllers/loanController'
import {upload} from '../middlewares/uploads'
import { Auth } from '../middlewares/Auth';
import  {body, validationResult} from 'express-validator'
import { validate } from '../middlewares/validate';
import { ValidationErrors } from '../utils/validationError';

import { isRegionalAgent } from '../middlewares/userAuth';

const Router=  express.Router() ;



Router.route("/personalloan/request").post(

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

Router.route("/personalloan/reject/:id").patch(Auth,rejectPersonalLoanRequest)  ;
Router.route("/personalloan/accept/:id").patch(Auth ,acceptPersonalLoanRequest) 
Router.route("/personalloan/deny/:id").patch(Auth,isRegionalAgent, denyPersonalLoanRequest) ; 
Router.route("/personalloan/approve/:id").patch(Auth , isRegionalAgent, approvePersonalLoanRequest);

//ADMIN orCLientmanager
//query loans 

//query all loans only admins
Router.route("/").get(getAllLoans)
//query a single loan both admin

//query a users loans  // 


//agent can query loans that belong to him
//query a users loan if the loan was registered by him
//query a single loan that was registered by them

//user actions 

//query all their loans

//query a single loan that belongs to them




export {Router as loanRouter} ; 
