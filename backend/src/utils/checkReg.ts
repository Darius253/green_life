import { register } from '@controllers/registrationController';
import { Auth } from '@middlewares/Auth';
import {body} from 'express-validator'
import express, { Request } from 'express' ; 
import {validate} from '@middlewares/validate'
import {validationResult , ValidationError} from 'express-validator'
import { EducationLevel, employmentStatus, gender, MaritalStatus, residentialStatus, response, Source } from '@models/models.interface';
import { ValidationErrors } from './validationError';


export async  function checkReg(req:Request){
await body("fullname")
  .notEmpty()
  .bail()
  .matches(/^[A-Za-z\s]*$/)
  .bail()
  .trim()
  .isLength({ min: 5, max: 100 })
  .escape()
  .bail()
  .run(req),
  await body("gender")
    .notEmpty()
    .bail()
    .trim()
    .escape()
    .isLength({
      min: 4,
      max: 5,
    })
    .bail()
    .custom((value, { req }) => {
      if (!Object.values(gender).includes(value)) {
        throw new Error("Gender must male , female or other only");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("age")
    .isNumeric({ no_symbols: true })
    .bail()
    .custom((value, {}) => {
      if (value > 150) {
        throw new Error("Age cannot be greater than 100");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("maritalStatus")
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 })
    .bail()
    .trim()
    .escape()
    .custom((value, {}) => {
      if (!Object.values(MaritalStatus).includes(value)) {
        throw new Error(
          "marital status must be divorced, single . married , widow or widower only"
        );
      }
      return true;
    })
    .bail()
    .run(req),
  await body("educationLevel")
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 })
    .bail()
    .trim()
    .escape()
    .custom((value, {}) => {
      if (!Object.values(EducationLevel).includes(value)) {
        throw new Error(
          "Educational level must be JHS ,SHS, Tertiary or none only"
        );
      }

      return true;
    })
    .bail()
    .run(req),
  await body("residentialStatus")
    .notEmpty()
    .bail()
    .trim()
    .isLength({ min: 1, max: 50 })
    .bail()
    .escape()
    .custom((value, {}) => {
      if (!Object.values(residentialStatus).includes(value)) {
        throw new Error(
          "residential status  must be residential or non-residential"
        );
      }

      return true;
    })
    .bail()
    .run(req),
  await body("residentialAddress")
    .notEmpty()
    .bail()
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .bail()
    .bail()
    .run(req),
  await body("NoYearsAtResidence")
    .isNumeric()
    .bail()
    .notEmpty()
    .bail()
    .run(req),
  await body("employmentStatus")
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 })
    .bail()
    .trim()
    .escape()
    .custom((value, {}) => {
      if (!Object.values(employmentStatus).includes(value)) {
        throw new Error("Employmentstatus must only be employed or unemployed");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("Occupation").optional()
    .custom((value: string, { req }) => {
      if (
        (req.body.employmentStatus === employmentStatus.Employed ||
          req.body.employmentStatus === employmentStatus.SelfEmployed) &&
        (value.length == 0 || !value.match(/^[A-Za-z\s]*$/))
      ) {
        throw new Error("Cannot be empty");
      }

      return true;
    })
    .bail()
    .trim()
    .escape()
    .isLength({ min: 4, max: 200 })
    .bail()
    .run(req),
  await body("Income").optional()
    .isNumeric()
    .bail()
    .custom((value) => {
        if (
          (req.body.employmentStatus === employmentStatus.Employed ||
            req.body.employmentStatus === employmentStatus.SelfEmployed) &&
          (value.length < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true
    })
    .bail()
    .run(req),
  await body("Savings").optional()
    .isNumeric()
    .bail()
    .custom((value) => {
        if (
          (req.body.employmentStatus === employmentStatus.Employed ||
            req.body.employmentStatus === employmentStatus.SelfEmployed) &&
          (value.length < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
    })
    .bail()
    .run(req),
  await body("Surplus").optional()
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (
        (req.body.employmentStatus === employmentStatus.Employed ||
          req.body.employmentStatus === employmentStatus.SelfEmployed) &&
        !Object.values(employmentStatus).includes(value)
      ) {
        throw new Error("surplus can only be save , invest, spend ,none");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("NoOfDependants").isNumeric().bail().notEmpty().bail().run(req),
  await body("CurrentlyServingaLoan")
    .notEmpty()
    .bail()
    .trim()
    .isLength({ min: 1, max: 4 })
    .bail()
    .escape()
    .custom((value, {}) => {
      if (!Object.values(response).includes(value)) {
        throw new Error("Currently serving a loan can only be yes or no");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("SourceOfLoan").optional()
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (
        req.body.CurrentlyServingaLoan === response.YES &&
        (value.length === 0 || !Object.values(Source).includes(value))
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("loanAmount").optional()
    .isNumeric()
    .bail()
    .trim()
    .escape()
    .custom((value: number, { req }) => {
      if (req.body.CurrentlyServingaLoan === response.YES && isNaN(value)) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("loanApproved").optional()
    .isNumeric()
    .bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (
        req.body.CurrentlyServingaLoan === response.YES &&
        !Object.values(response).includes(value)
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("defaulted").optional()
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (
        req.body.CurrentlyServingaLoan === response.YES &&
        (value.length === 0 || !Object.values(response).includes(value))
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("NoMonthsDefaulted").optional()
    .isNumeric()
    .bail()
    .custom((value: number, { req }) => {
      if (req.body.CurrentlyServingaLoan === response.YES && isNaN(value)) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req);


      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidationErrors(errors.array());
      }
}


export async function checkguarantors(req:Request){


    await body("guarantor1fullname").notEmpty()
  .bail()
  .matches(/^[A-Za-z\s]*$/)
  .bail()
  .trim()
  .isLength({ min: 5, max: 100 })
  .escape()
  .bail()
  .run(req) ,
    await body("guarantor1phoneNumber").isMobilePhone("en-GH").bail().notEmpty().bail().run(req) ,

    await body("guarantor2fullname") .notEmpty()
  .bail()
  .matches(/^[A-Za-z\s]*$/)
  .bail()
  .trim()
  .isLength({ min: 5, max: 100 })
  .escape()
  .bail()
  .run(req) ,
 await body("guarantor2phoneNumber").isMobilePhone("en-GH").bail().notEmpty().bail().run(req) 

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     throw new ValidationErrors(errors.array());
   }
}


// export function throwError(req:Request){


  

// }