// import { register } from '@controllers/registrationController';
// import { Auth } from '@middlewares/Auth';
import {body} from 'express-validator'
import express, { Request } from 'express' ; 
// import {validate} from '@middlewares/validate'
import {validationResult , ValidationError} from 'express-validator'
import { EducationLevel, employmentStatus, gender, MaritalStatus, registerationRepresentativePostion, residentialStatus, response, Source, Surplus } from '../models/models.interface';
import { ValidationErrors } from './validationError';


export async  function checkReg(req:any){
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
      max: 10,
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
          "marital status must be Divorced, Single . Married , Widow or Widower only"
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
          "residential status  must be Residential or Non-residential"
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
    .isNumeric({no_symbols:true})
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
        throw new Error("Employmentstatus must only be Employed or Unemployed or Self employed");
      }

      return true;
    })
    .bail()
    .run(req),await body("Employer")
    .custom((value: string, { req }) => {
       console.log(req.body.employmentStatus)
       if(req.body.employmentStatus !==  employmentStatus.Employed && !value){
        return true
       }
      else if(req.body.employmentStatus !== employmentStatus.Employed && value){
         throw new Error("value not needed")
       }
    else if(   
        req.body.employmentStatus === employmentStatus.Employed && !value){

          throw new Error("occupation is undefined") 

      }
     else if (
        req.body.employmentStatus === employmentStatus.Employed   
        &&
        (value.length == 0 || !/^[A-Za-z\s]*$/.test(value) || value.length > 140)
      ) {
        throw new Error("Cannot be empty");
      }

      return true;
    })
    .bail()
    .trim()
    .escape()
  
    .run(req),
  await body("Occupation")
    .custom((value: string, { req }) => {
       console.log(req.body.employmentStatus)
       if(req.body.employmentStatus ===  employmentStatus.Unemployed && !value){
        return true
       }
      else if(req.body.employmentStatus === employmentStatus.Unemployed && value){
         throw new Error("value not needed")
       }
    else if(   
        req.body.employmentStatus !== employmentStatus.Unemployed && !value){

          throw new Error("occupation is undefined") 

      }
     else if (
        req.body.employmentStatus !== employmentStatus.Unemployed   &&
        (value.length == 0 || !/^[A-Za-z\s]*$/.test(value) || value.length > 140)
      ) {
        throw new Error("Cannot be empty");
      }

      return true;
    })
    .bail()
    .trim()
    .escape()
  
    .run(req),
  await body("Income")
    .custom((value) => {
      if(req.body.employmentStatus ===  employmentStatus.Unemployed && !value){
        return true
       }
      else if(req.body.employmentStatus === employmentStatus.Unemployed && value){
         throw new Error("value not needed")
       }
      else if(   
        req.body.employmentStatus !== employmentStatus.Unemployed && !value){

          throw new Error("value is undefined") 

      } 

       else if (
          
            req.body.employmentStatus !== employmentStatus.Unemployed &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true
    })
    .bail()
    .run(req),
  await body("Savings")

 
    .custom((value) => {

      if(req.body.employmentStatus ===  employmentStatus.Unemployed && !value){
        return true
       }
      else if(req.body.employmentStatus === employmentStatus.Unemployed && value){
         throw new Error("value not needed")
       }
     else  if(   
        req.body.employmentStatus !== employmentStatus.Unemployed && !value){

          throw new Error("value is undefined") 

      } 
     else   if (
        
            req.body.employmentStatus !== employmentStatus.Unemployed &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
    })
    .bail()
    .run(req),
  await body("Surplus")
    .escape()
    .custom((value, { req }) => {
      if(req.body.employmentStatus ===  employmentStatus.Unemployed && !value){
        return true
       }
      else if(req.body.employmentStatus === employmentStatus.Unemployed && value){
         throw new Error("value not needed")
       }
      else if(   
        req.body.employmentStatus !== employmentStatus.Unemployed && !value){

          throw new Error("value is undefined") 

      } 
      else if (
        
          req.body.employmentStatus !== employmentStatus.Unemployed &&
        !Object.values(Surplus).includes(value)
      ) {
        throw new Error("surplus can only be save , invest, spend ,none");
      }

      return true;
    })
    .bail()
    .run(req),
  await body("NoOfDependants").isNumeric({no_symbols:true}).bail().notEmpty().bail().
run(req),
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
  await body("SourceOfLoan")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if(req.body.CurrentlyServingaLoan === response.No  && !value){
        return true ; 
      }
      else  if(req.body.CurrentlyServingaLoan  ===  response.No && value){
        throw new Error("value not needed")
      }
      
      else if   
        (req.body.CurrentlyServingaLoan ===  response.YES && !value){

          throw new Error("value is undefined") 

      } 
     else if (
        req.body.CurrentlyServingaLoan === response.YES &&
        (value.length === 0 || !Object.values(Source).includes(value))
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("loanAmount")
   
  
    .trim()
    .escape()
    .custom((value: number, { req }) => {
      if(req.body.CurrentlyServingaLoan === response.No  && !value){
        return true ; 
      }
      else  if(req.body.CurrentlyServingaLoan  ===  response.No && value){
        throw new Error("value not needed")
      }
      else if   
        (req.body.CurrentlyServingaLoan ===  response.YES && !value){

          throw new Error("value is undefined") 

      } 
      else if (req.body.CurrentlyServingaLoan === response.YES && (
        value <0  || isNaN(value)
      )) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("loanApproved")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if(req.body.CurrentlyServingaLoan === response.No  && !value){
        return true ; 
      }
      else  if(req.body.CurrentlyServingaLoan  ===  response.No && value){
        throw new Error("value not needed")
      }
      else if   
        (req.body.CurrentlyServingaLoan ===  response.YES && !value){

          throw new Error("value is undefined") 

      } 
    else  if (
        req.body.CurrentlyServingaLoan === response.YES &&
        !Object.values(response).includes(value)
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("defaulted")
    .trim()
    .escape()
    .custom((value, { req }) => {
       if(req.body.CurrentlyServingaLoan === response.No  && !value){
        return true ; 
      }
      else  if(req.body.CurrentlyServingaLoan  ===  response.No && value){
        throw new Error("value not needed")
      }
     else  if   
        (req.body.CurrentlyServingaLoan ===  response.YES && !value){

          throw new Error("value is undefined") 

      } 
    else  if (
        req.body.CurrentlyServingaLoan === response.YES &&
        (value.length === 0 || !Object.values(response).includes(value))
      ) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req),
  await body("NoMonthsDefaulted")
    
    .bail()
    .custom((value: number, { req }) => {
      if(req.body.CurrentlyServingaLoan === response.No  && !value){
        return true ; 
      }
      else  if(req.body.CurrentlyServingaLoan  ===  response.No && value){
        throw new Error("value not needed")
      }
   else    if   
        (req.body.CurrentlyServingaLoan ===  response.YES && !value){

          throw new Error("value is undefined") 

      } 
    else  if (req.body.CurrentlyServingaLoan === response.YES && (value < 0  || isNaN(value))) {
        throw new Error("Cannot be empty");
      }
      return true;
    })
    .bail()
    .run(req);


      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty()) {
        throw new ValidationErrors(errors.array());
      }
}


export async function checkguarantors(req:any){


    await body("guarantor1fullname")
  .bail()
  .matches(/^[A-Za-z\s]*$/)
  .bail()
  .trim()
  .isLength({min:5 , max:100})
  .escape().notEmpty()
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
  //  console.log(errors.array())
   if (!errors.isEmpty()) {
     throw new ValidationErrors(errors.array());
   }


}



export async function checkSmeReg(req: any) {
  await body("businessName")
    .notEmpty()
    .bail()
    .matches(/^[A-Za-z\s]*$/)
    .bail()
    .trim()
    .isLength({ min: 5, max: 100 })
    .escape()
    .bail()
    .run(req),
    await body("representativeName")
      .notEmpty()
      .bail()
      .matches(/^[A-Za-z\s]*$/)
      .bail()
      .trim()
      .isLength({ min: 5, max: 100 })
      .escape()
      .bail()
      .run(req),
    await body(" businessRegistrationNumber")
      .notEmpty()
      .bail()
      .isLength({min:10 , max:20})
      .bail()
      .trim()
      .isNumeric()
      .escape()
      .bail()
      .run(req),
    await body("businessTin")
      .notEmpty()
      .bail()
      .isLength({min:10, max:20})
      .bail()
      .trim()
      .isNumeric()
      .escape()
      .bail()
      .run(req),
    await body("representativePosition")
      .notEmpty()
      .bail()
      .trim()
      .escape()
      .isLength({
        min: 4,
        max: 10,
      })
      .bail()
      .custom((value, { req }) => {
        if (
          !Object.values(registerationRepresentativePostion).includes(value)
        ) {
          throw new Error("invalid value");
        }

        return true;
      })
      .bail()
      .run(req),
    await body("numberofBeneficialOwners")
      .notEmpty()
      .bail()
      .trim()
      .isNumeric()
      .bail()
      .run(req),
    await body("numberofShareHolders")
      .notEmpty()
      .bail()
      .trim()
      .isNumeric()
      .bail()
      .run(req),
    await body("numberofDirectors")
      .notEmpty()
      .bail()
      .trim()
      .isNumeric()
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
            "residential status  must be Residential or Non-residential"
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
      .isNumeric({ no_symbols: true })
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
          throw new Error(
            "Employmentstatus must only be Employed or Unemployed or Self employed"
          );
        }

        return true;
      })
      .bail()
      .run(req),
    await body("Employer")
      .custom((value: string, { req }) => {
        console.log(req.body.employmentStatus);
        if (req.body.employmentStatus !== employmentStatus.Employed && !value) {
          return true;
        } else if (
          req.body.employmentStatus !== employmentStatus.Employed &&
          value
        ) {
          throw new Error("value not needed");
        } else if (
          req.body.employmentStatus === employmentStatus.Employed &&
          !value
        ) {
          throw new Error("occupation is undefined");
        } else if (
          req.body.employmentStatus === employmentStatus.Employed &&
          (value.length == 0 ||
            !/^[A-Za-z\s]*$/.test(value) ||
            value.length > 140)
        ) {
          throw new Error("Cannot be empty");
        }

        return true;
      })
      .bail()
      .trim()
      .escape()

      .run(req),
    await body("Occupation")
      .custom((value: string, { req }) => {
        console.log(req.body.employmentStatus);
        if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          !value
        ) {
          return true;
        } else if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          value
        ) {
          throw new Error("value not needed");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          !value
        ) {
          throw new Error("occupation is undefined");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          (value.length == 0 ||
            !/^[A-Za-z\s]*$/.test(value) ||
            value.length > 140)
        ) {
          throw new Error("Cannot be empty");
        }

        return true;
      })
      .bail()
      .trim()
      .escape()

      .run(req),
    await body("Income")
      .custom((value) => {
        if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          !value
        ) {
          return true;
        } else if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          value
        ) {
          throw new Error("value not needed");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          !value
        ) {
          throw new Error("value is undefined");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("Savings")
      .custom((value) => {
        if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          !value
        ) {
          return true;
        } else if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          value
        ) {
          throw new Error("value not needed");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          !value
        ) {
          throw new Error("value is undefined");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("Surplus")
      .escape()
      .custom((value, { req }) => {
        if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          !value
        ) {
          return true;
        } else if (
          req.body.employmentStatus === employmentStatus.Unemployed &&
          value
        ) {
          throw new Error("value not needed");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          !value
        ) {
          throw new Error("value is undefined");
        } else if (
          req.body.employmentStatus !== employmentStatus.Unemployed &&
          !Object.values(Surplus).includes(value)
        ) {
          throw new Error("surplus can only be save , invest, spend ,none");
        }

        return true;
      })
      .bail()
      .run(req),
    await body("NoOfDependants")
      .isNumeric({ no_symbols: true })
      .bail()
      .notEmpty()
      .bail()
      .run(req),
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
    await body("SourceOfLoan")
      .trim()
      .escape()
      .custom((value, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.No && !value) {
          return true;
        } else if (req.body.CurrentlyServingaLoan === response.No && value) {
          throw new Error("value not needed");
        } else if (req.body.CurrentlyServingaLoan === response.YES && !value) {
          throw new Error("value is undefined");
        } else if (
          req.body.CurrentlyServingaLoan === response.YES &&
          (value.length === 0 || !Object.values(Source).includes(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("loanAmount")
      .trim()
      .escape()
      .custom((value: number, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.No && !value) {
          return true;
        } else if (req.body.CurrentlyServingaLoan === response.No && value) {
          throw new Error("value not needed");
        } else if (req.body.CurrentlyServingaLoan === response.YES && !value) {
          throw new Error("value is undefined");
        } else if (
          req.body.CurrentlyServingaLoan === response.YES &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("loanApproved")
      .trim()
      .escape()
      .custom((value, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.No && !value) {
          return true;
        } else if (req.body.CurrentlyServingaLoan === response.No && value) {
          throw new Error("value not needed");
        } else if (req.body.CurrentlyServingaLoan === response.YES && !value) {
          throw new Error("value is undefined");
        } else if (
          req.body.CurrentlyServingaLoan === response.YES &&
          !Object.values(response).includes(value)
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("defaulted")
      .trim()
      .escape()
      .custom((value, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.No && !value) {
          return true;
        } else if (req.body.CurrentlyServingaLoan === response.No && value) {
          throw new Error("value not needed");
        } else if (req.body.CurrentlyServingaLoan === response.YES && !value) {
          throw new Error("value is undefined");
        } else if (
          req.body.CurrentlyServingaLoan === response.YES &&
          (value.length === 0 || !Object.values(response).includes(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req),
    await body("NoMonthsDefaulted")
      .bail()
      .custom((value: number, { req }) => {
        if (req.body.CurrentlyServingaLoan === response.No && !value) {
          return true;
        } else if (req.body.CurrentlyServingaLoan === response.No && value) {
          throw new Error("value not needed");
        } else if (req.body.CurrentlyServingaLoan === response.YES && !value) {
          throw new Error("value is undefined");
        } else if (
          req.body.CurrentlyServingaLoan === response.YES &&
          (value < 0 || isNaN(value))
        ) {
          throw new Error("Cannot be empty");
        }
        return true;
      })
      .bail()
      .run(req);

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new ValidationErrors(errors.array());
  }
}


async function checkexec(req:Request){


  for(let  i = 1 ; i<= req.body.numberofBeneficialOwners ;i++){

        await body(`beneficialOwner${i}fullname`)
          .bail()
          .matches(/^[A-Za-z\s]*$/)
          .bail()
          .trim()
          .isLength({ min: 5, max: 100 })
          .escape()
          .notEmpty()
          .run(req),
          await body(`beneficialOwner${i}phoneNumber`)
            .isMobilePhone("en-GH")
            .bail()
            .notEmpty()
            .bail()
            .run(req); 
  }
    for (let i = 1; i <= req.body.numberofShareHolders; i++) {
      await body(`shareHolders${i}fullname`)
        .bail()
        .matches(/^[A-Za-z\s]*$/)
        .bail()
        .trim()
        .isLength({ min: 5, max: 100 })
        .escape()
        .notEmpty()
        .run(req),
        await body(`shareHolders${i}phoneNumber`)
          .isMobilePhone("en-GH")
          .bail()
          .notEmpty()
          .bail()
          .run(req);
    }
      for (let i = 1; i <= req.body.numberofDirectors; i++) {
        await body(`directors${i}fullname`)
          .bail()
          .matches(/^[A-Za-z\s]*$/)
          .bail()
          .trim()
          .isLength({ min: 5, max: 100 })
          .escape()
          .notEmpty()
          .run(req),
          await body(`directors${i}phoneNumber`)
            .isMobilePhone("en-GH")
            .bail()
            .notEmpty()
            .bail()
            .run(req);
      }
 const errors = validationResult(req);
 console.log(errors);
 if (!errors.isEmpty()) {
   throw new ValidationErrors(errors.array());
 }
}

// export function throwError(req:Request){


  

// }