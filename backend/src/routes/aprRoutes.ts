import express from 'express' ; 
import  {body} from 'express-validator'
const Router = express.Router() ; 

// import {loanSummary , createApr , getApr, editApr} from '@controllers/aprController'
// import { validate } from '@middlewares/validate';


// Router.route("/api/apr")
//   .post(
//     [
//       body("interestRate")
//         .notEmpty()
//         .isNumeric()
//         .custom((value, {}) => {
//           if (value > 10 || value <0 ) {
//             throw new Error("value cannot be greater than 10 or less than zero");
//           }
//           return true;
//         }),
//       body("charges")
//         .notEmpty()
//         .isNumeric()
//         .custom((value, {}) => {
//           if (value > 10 || value <0) {
//             throw new Error("value cannot be greater than 10 or less than zero");
//           }
//           return true;
//         }),
//     ],
//    validate , createApr
//   )
//   .get(getApr)
//   .put(
//     [
//       body("interestRate")
//         .notEmpty()
//         .isNumeric()
//         .custom((value, {}) => {
//           if (value > 10 || value < 0) {
//             throw new Error("value cannot be greater than 10 or less than zero");
//           }
//           return true;
//         }),
//       body("charges")
//         .notEmpty()
//         .isNumeric()
//         .custom((value, {}) => {
//           if (value > 10 || value <0) {
//             throw new Error("value cannot be greater than 10 or less than zero");
//           }
//           return true;
//         }),
//     ],
//    validate ,  editApr
//   );

// Router.route("/api/loan/loansummary").post(loanSummary);





export {Router  as aprRouter} ;