
import { Schema, model , SchemaType } from "mongoose";
import {response , EducationLevel, employmentStatus, gender, Iregistration, MaritalStatus, residentialStatus, Surplus, Source } from "./models.interface";

//creating the registration schema 
const registrationSchema = new Schema<Iregistration>({
  fullname: { type: String, default: null },
  gender: { type: String, enum: Object.values(gender),default:gender.NULL  },
  age: { type: Number, default: null },
  maritalStatus: {
    type: String,
    enum: Object.values(MaritalStatus),
    default:MaritalStatus.NULL
   
  },
  educationLevel: {
    type: String,
    enum: Object.values(EducationLevel),
    default:EducationLevel.NULL
  
  },
  residentialStatus: {
    type: String,
    enum: Object.values(residentialStatus),
    default:residentialStatus.NULL
 
  },
  residentialAddress: { type: String, default: null },
  NoYearsAtResidence: { type: Number, default: null },
  face: { type: String, required: true },
  ghanaCardBack: { type: String, required: true },
  ghanaCardFront: { type: String, required: true },
  employmentStatus: {
    type: String,

    enum: Object.values(employmentStatus),
    default:employmentStatus.NULL
   
  },
  Occupation: { type: String, default: null },
  Employer: { type: String, default: null },
  Income: { type: Number, default: null },
  Savings: { type: Number, default: null },
  Surplus: {
    type: String,
    default: Surplus.None,
    enum: Object.values(Surplus),
  },
  NoOfDependants: { type: Number, default: 0 },
  CurrentlyServingaLoan: {
    type: String,

    enum: Object.values(response),
   required:true ,
   default: response.NULL
  },
  SourceOfLoan: { type: String, enum: Object.values(Source), default:Source.NULL },
  loanAmount: { type: Number, default: null },
  loanApproved: { type: String, enum: Object.values(response), default: response.NULL },
  defaulted: { type: String, enum: Object.values(response), default: response.NULL },
  NoMonthsDefaulted: { type: Number, default: null },
  user: { type: Schema.Types.ObjectId, ref: "Client", required: true },
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