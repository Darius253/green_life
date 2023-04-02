import express from 'express' ; 
import  {body} from 'express-validator' ;
import * as policyContoller from '../controllers/policyController' ;
import { validate } from '../middlewares/validate';
import { Auth } from '../middlewares/Auth';
import { isAdmin } from '../middlewares/userAuth';
const Router = express.Router() ; 



Router.route("/api/loan/policy")
  .post(
    [
      body("interestRate")
        .notEmpty()
        .isNumeric()
        .custom((value: number, { req }) => {
          if (value < 0 || value > 40) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("noRegisterationAmountCap")
        .notEmpty()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < 0 || value >= req.body.noGurantorAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("noGurantorAmountCap")
        .notEmpty()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < req.body.noRegisterationAmountCap || value >= req.body.personalloanAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("personalloanAmountCap")
        .notEmpty()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < req.body.noGurantorAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("personalloanterm")
        .notEmpty()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < 0) {
            throw new Error("invalid value");
          }
          return true;
        }),
    ],
    validate,
    Auth,
    isAdmin,
    policyContoller.create
  )
  .get(policyContoller.get); 


Router.route("/api/loan/policy/:id").put(
  [body("interestRate")
        .notEmpty()
        .isNumeric()
        .custom((value: number, { req }) => {
          if (value < 0 || value > 40) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("noRegisterationAmountCap")
        .notEmpty()
        
        .isNumeric()
        .custom((value, { req }) => {
          if (value < 0 || value >= req.body.noGurantorAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("noGurantorAmountCap")
        
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < req.body.noRegisterationAmountCap || value >= req.body.personalloanAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("personalloanAmountCap")
        .notEmpty()
        
        .isNumeric()
        .custom((value, { req }) => {
          if (value < req.body.noGurantorAmountCap) {
            throw new Error("invalid value");
          }
          return true;
        }),
      body("personalloanterm")
        
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
          if (value < 0) {
            throw new Error("invalid value");
          }
          return true;
        }),
    ],
  validate,
  Auth,
  isAdmin , policyContoller.edit
);





export {Router  as policyRouter} ;