import { register } from '@controllers/registrationController';
import { Auth } from '@middlewares/Auth';
import {body} from 'express-validator'
import express from 'express' ; 
import { employmentStatus, gender, response } from '@models/models.interface';
const Router =  express.Router(); 


Router.route("/api/users/register").post(
  [
    body("fullname")
      .notEmpty()
      .matches(/^[A-Za-z\s]*$/)
      .trim()
      .escape(),

    body("gender").notEmpty().trim().escape(),
    body("age").isNumeric({ no_symbols: true }),
    body("maritalStatus").notEmpty().trim().escape(),
    body("educationLevel").notEmpty().trim().escape(),
    body("residentialStatus").notEmpty().trim().escape(),
    body("residentialAddress").notEmpty().trim().escape(),
    body("NoYearsAtResidence").isNumeric().notEmpty(),
    body("employmentStatus").notEmpty().trim().escape(),
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
      .escape(),
    body("Income").isNumeric(),
    body("Savings").isNumeric(),
    body("Surplus").trim().escape(),
    body("NoOfDependants").isNumeric().notEmpty(),
    body("CurrentlyServingaLoan").notEmpty().trim().escape(),
    body("SourceOfLoan")
      .trim()
      .escape()
      .custom((value: string, { req }) => {
        if (
          req.body.CurrentlyServingaLoan === response.YES &&
          value.length === 0
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
      .custom((value: string, { req }) => {
        if (
          req.body.CurrentlyServingaLoan === response.YES &&
          value.length === 0
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
  Auth,
  register
);




export  {Router  as registrationRouter} ; 