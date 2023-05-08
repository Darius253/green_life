import  express  , {NextFunction, Request , Response}from 'express' ; 
import {acceptPersonalLoanRequest, agentCreatePersonalloanRequest, agentCreateSmeRequest, approvePersonalLoanRequest, createSmeRequest, denyPersonalLoanRequest, editLoan, getAgentLoan, getAgentLoans, getAllLoans, getLoan, getclientLoan, getclientLoans, getuserLoans, rejectPersonalLoanRequest, requestPersonalLoan } from '../controllers/loanController'
import {upload} from '../middlewares/uploads'
import { Auth } from '../middlewares/Auth';
import  {body, query, validationResult} from 'express-validator'
import { validate } from '../middlewares/validate';
import { ValidationErrors } from '../utils/validationError';

import { isRegionalAgent  , userAuth} from '../middlewares/userAuth';
import { LOANTYPE } from '../models/models.interface';

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

Router.route("/personalloan/request/agent/:id").post(
  Auth, userAuth ,
  upload.fields([
    { name: "face", maxCount: 1 },
    { name: "ghanaCardFront", maxCount: 1 },
    { name: "ghanaCardBack", maxCount: 1 },
  ]),
  [
    body("principal")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),
    body("interestrate")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),
    body("loanterm")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),

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
  ],
  validate, agentCreatePersonalloanRequest

);

Router.route("/reject/:id").patch(Auth,rejectPersonalLoanRequest)  ;
Router.route("/accept/:id").patch(Auth ,acceptPersonalLoanRequest) 
Router.route("/deny/:id").patch(Auth,isRegionalAgent, denyPersonalLoanRequest) ; 
Router.route("/approve/:id").patch(Auth , isRegionalAgent, approvePersonalLoanRequest);

//ADMIN orCLientmanager
//query loans 

//query all loans only admins
Router.route("/").get(Auth , isRegionalAgent ,
  [
    query("loanType")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        console.log(value);
        //@ts-ignore
        if (!Object.values(LOANTYPE).includes(value)) {
          return;
        }
        return value;
      }),

    query("min_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
      return value
      }),
      query("page").escape().trim() ,
    query("max_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
       return value ;
      }),
  ],
  getAllLoans
);
//query a single loan both admin

//query a users loans  // 
Router.route("/clientsloans/:id").get(
  [
    query("loanType")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        //@ts-ignore
        if (!Object.values(LOANTYPE).includes(value)) {
          return;
        }
        return value;
      }),
query("page").escape().trim() ,
    query("min_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
    query("max_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
  ],
  getuserLoans
);





//agent can query loans that belong to him
//query a users loan if the loan was registered by him
Router.route("/agentloans/:id").get( [
    query("loanType")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        //@ts-ignore
        if (!Object.values(LOANTYPE).includes(value)) {
          return "";
        }
        return value;
      }),

    query("min_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
      query("page").escape().trim()  ,
    query("max_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
  ] , Auth , userAuth,getAgentLoans) ;
//query a single loan that was registered by them
Router.route("/agentloan/:id").get(Auth ,userAuth , getAgentLoan) ;

//user actions 

//query all their loans

Router.route("/clientsLoan").get(Auth ,  [
    query("loanType")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        //@ts-ignore
        if (!Object.values(LOANTYPE).includes(value)) {
          return "";
        }
        return value;
      }),
query("page").escape().trim()  ,
    query("min_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
    query("max_principal")
      .escape()
      .trim()
      .customSanitizer((value: string) => {
        if (parseInt(value) < 0) {
          return (parseInt(value) * -1).toString();
        }
        return value;
      }),
  ] ,getclientLoans)

//query a single loan that belongs to them
Router.route("/clientsLoan/:id").get(Auth , getclientLoan)

Router.route("/:id").get(Auth ,isRegionalAgent , getLoan).put([
    body("principal").isNumeric().custom((value)=>{
       

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
  ] ,Auth , isRegionalAgent,editLoan )

Router.route("/smeLoan/request").post(Auth ,   upload.fields([
    { name: "face", maxCount: 1 },
    { name: "ghanaCardFront", maxCount: 1 },
    { name: "ghanaCardBack", maxCount: 1 },
    { name: "businessCertificate", maxCount: 1 },
    { name: "form3", maxCount: 1 },
    { name: "municipalCertificate", maxCount: 1 },
    { name: "taxReturns", maxCount: 1 },
    { name: "bankStatement", maxCount: 1 },
    { name: "financialStatement", maxCount: 1 },
  ]) ,
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
  ] ,


  createSmeRequest
);

Router.route("/smeLoan/request/agent/:id").post(
  Auth,userAuth ,
  upload.fields([
    { name: "face", maxCount: 1 },
    { name: "ghanaCardFront", maxCount: 1 },
    { name: "ghanaCardBack", maxCount: 1 },
    { name: "businessCertificate", maxCount: 1 },
    { name: "form3", maxCount: 1 },
    { name: "municipalCertificate", maxCount: 1 },
    { name: "taxReturns", maxCount: 1 },
    { name: "bankStatement", maxCount: 1 },
    { name: "financialStatement", maxCount: 1 },
  ]),
  [
    body("principal")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),
    body("interestrate")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),
    body("loanterm")
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          throw new Error("value cannot be negative");
        }

        return true;
      }),

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
  ],

  agentCreateSmeRequest
);

export {Router as loanRouter} ; 
