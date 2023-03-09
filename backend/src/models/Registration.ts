
import { Schema, model , SchemaType } from "mongoose";
import {response , EducationLevel, employmentStatus, gender, Iregistration, MaritalStatus, residentialStatus, Surplus, Source } from "./models.interface";

//creating the registration schema 
const registrationSchema = new Schema<Iregistration>({

  fullName: { type: String, required: true },
  gender: { type: String, enum: gender, required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, enum: MaritalStatus, required: true },
  educationLevel: { type: String, enum: EducationLevel, required: true },
  residentialStatus: { type: String, enum: residentialStatus, required: true },
  residentialAddress: { type: String, required: true },
  NoYearsAtResidence: { type: Number, required: true },
  face: { type: String, required: true },
  ghanaCardBack: { type: String, required: true },
  ghanaCardFront: { type: String, required: true },
  employmentStatus: { type: String, required: true, enum: employmentStatus },
  Occupation: { type: String,  },
  Employer: { type: String, default: null },
  Income: { type: Number, default: null },
  Savings: { type: Number, default: null },
  Surplus: { type: String, default:Surplus.None, enum: Surplus },
  NoOfDependants: { type: Number, required: true, default: 0 },
  CurrentlyServingaLoan: { type: String, required: true, enum: response },
  SourceOfLoan: { type: String , enum: Source  },
  loanAmount: { type: Number  ,default:null },
  loanApproved: { type: String, enum: response, },
  defaulted: { type: String, enum: response },
  NoMonthsDefaulted: { type: Number,default:null },
});


//handling the option


//@ts-ignore
registrationSchema.path("Occupation").required(function(){
    //@ts-ignore
    return this.employmentStatus === employmentStatus.Employed || this.employmentStatus === employmentStatus.SelfEmployed
} )

//@ts-ignore
registrationSchema.path("Employer").required(function(){
  //@ts-ignore
  return this.employmentStatus === employmentStatus.Employed;
})
//@ts-ignore
registrationSchema.path("Income").required(function(){
  //@ts-ignore
  return (
    //@ts-ignore
    this.employmentStatus === employmentStatus.Employed ||
    //@ts-ignore
    this.employmentStatus === employmentStatus.SelfEmployed
  );
})


//@ts-ignore
registrationSchema.path("Savings").required(function () {
  return (
    //@ts-ignore
    this.employmentStatus === employmentStatus.Employed ||
    //@ts-ignore
    this.employmentStatus === employmentStatus.SelfEmployed
  );
});
//@ts-ignore
registrationSchema.path("Surplus").required(function () {
  return (
    //@ts-ignore
    this.employmentStatus === employmentStatus.Employed ||
    //@ts-ignore
    this.employmentStatus === employmentStatus.SelfEmployed
  );
});


//@ts-ignore
registrationSchema.path("SourceOfLoan").required(function () {
  return (
    //@ts-ignore
    this.CurrentlyServingaLoan === response.YES
  );
});
//@ts-ignore
registrationSchema.path("loanAmount").required(function () {
  return (
    //@ts-ignore
    this.CurrentlyServingaLoan === response.YES
  );
});
//@ts-ignore
registrationSchema.path("loanApproved").required(function () {
  return (
    //@ts-ignore
    this.CurrentlyServingaLoan === response.YES
  );
});
//@ts-ignore
registrationSchema.path("defaulted").required(function () {
  return (
    //@ts-ignore
    this.CurrentlyServingaLoan === response.YES
  );
});
//@ts-ignore
registrationSchema.path("NoMonthsDefaulted").required(function () {
  return (
    //@ts-ignore
    this.CurrentlyServingaLoan === response.YES
  );
});

export const Registration =  model("REGISTRATION" , registrationSchema);