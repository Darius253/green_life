import { register } from '@controllers/registrationController';
import { Auth } from '@middlewares/Auth';
import {body} from 'express-validator'
import express from 'express' ; 
import {validate} from '@middlewares/validate'
import { EducationLevel, employmentStatus, gender, MaritalStatus, residentialStatus, response, Source } from '@models/models.interface';
const Router =  express.Router(); 


Router.route("/api/users/register").post(
  [
    body("fullname")
      .notEmpty()
      .matches(/^[A-Za-z\s]*$/)
      .trim().isLength({min:5 , max:100})
      .escape(),

    body("gender").notEmpty().trim().escape().isLength({
      min:4 , max:5
    }).custom((value  , {req})=>{
       
      if(!Object.values(gender).includes(value)){
        throw new Error("Gender must male , female or other only") ; 
      }

      return true  ; 
    }),
    body("age").isNumeric({ no_symbols: true }).custom((value ,{})=>{
       
      if(value  > 150){
        throw new Error("Age cannot be greater than 100") ; 
      }

      return true ; 
    }),
    body("maritalStatus").notEmpty().isLength({min:1 , max:50}).trim().escape().custom((value , {})=>{
       
      if(!Object.values(MaritalStatus).includes(value)){

        throw new Error("marital status must be divorced, single . married , widow or widower only");
      }
      return true ; 
    }),
    body("educationLevel").notEmpty().isLength({min:1, max:50}).trim().escape().custom((value , {})=>{

      if(!Object.values(EducationLevel).includes(value)){
      
        throw new Error("Educational level must be JHS ,SHS, Tertiary or none only")
      }

      return true 
    }),
    body("residentialStatus").notEmpty().trim().isLength({min:1, max:50}).escape().custom((value , {})=>{

      if(!Object.values(residentialStatus).includes(value)){
        throw new Error("residential status  must be residential or non-residential");
      }

      return true
    }),
    body("residentialAddress").notEmpty().trim().escape().isLength({min:1 , max:200}),
    body("NoYearsAtResidence").isNumeric().notEmpty(),
    body("employmentStatus").notEmpty().isLength({min:1, max:50}).trim().escape().custom((value , {})=>{

      if(!Object.values(employmentStatus).includes(value)){
        throw new Error("Employmentstatus must only be employed or unemployed")
      }

      return true
    }),
    body("Occupation")
      .custom((value: string, { req }) => {
        if (
          req.body.employmentStatus === employmentStatus.Employed &&
          (value.length == 0 || !value.match(/^[A-Za-z\s]*$/))
        ) {
          throw new Error("Cannot be empty");
        }

        return true;
      })
      .trim()
      .escape().isLength({min:4 , max:200}),
    body("Income").isNumeric(),
    body("Savings").isNumeric(),
    body("Surplus").trim().escape().custom((value , {req})=>{
     
      if(req.body.employmentStatus == employmentStatus.Employed && 
        !Object.values(employmentStatus).includes(value)){
          throw  new Error("surplus can only be save , invest, spend ,none");
        }


        return true;
    }),
    body("NoOfDependants").isNumeric().notEmpty(),
    body("CurrentlyServingaLoan").notEmpty().trim().isLength({min:1, max:4}).escape().custom((value , {})=>{

      if(!Object.values(response).includes(value)){
 
        throw  new Error("Currently serving a loan can only be yes or no");
      }

      return true;
    }),
    body("SourceOfLoan")
      .trim()
      .escape()
      .custom((value , { req }) => {
        if (
          req.body.CurrentlyServingaLoan === response.YES &&
         (value.length === 0 || !Object.values(Source).includes(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      }),
    body("loanAmount")
      .isNumeric()
      .trim()
      .escape()
      .custom((value: number, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.YES && isNaN(value)) {
          throw new Error("Cannot be empty");
        }
        return true;
      }),
    body("loanApproved")
      .isNumeric()
      .trim()
      .escape()
      .custom((value: number, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.YES && isNaN(value)) {
          throw new Error("Cannot be empty");
        }
        return true;
      }),
    body("defaulted")
      .trim()
      .escape()
      .custom((value, { req }) => {
        if (
          req.body.CurrentlyServingaLoan === response.YES &&
         ( value.length === 0 || !Object.values(response).includes(value)) 
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      }),
    body(" NoMonthsDefaulted")
      .isNumeric()
      .custom((value: number, { req }) => {
        if (
          req.body.CurrentlyServingaLoan === response.YES &&
          isNaN(value) 
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      }),
  ],
  validate , 
  Auth,
  register
);




export  {Router  as registrationRouter} ; 