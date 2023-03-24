import { Document, Types } from "mongoose";
import { Type } from "typescript";


export interface Iauth{
  name?:string ; 
  email:string ;
  phoneNumber:string ; 
  lock:userlock ;
  otpLock:otpLock ; 
  password:string
  otp:number |null;
}
export interface Iclient  extends Iauth{
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  registered: boolean;
  registration: Types.ObjectId;
  verified:boolean ;
  lock:userlock ; 
  otpLock:otpLock ;
  otp : number | null
}




export interface  Authclass {
 
  userLocked():boolean ;
  otpLocked():boolean;
}
export interface userlock{

  tries:number ; 
  expiresAt:Date |null

}


export interface otpLock{
  otpTries:number;
  expiresAt:Date |null
}

export enum gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widow = "Widow",
  Widower = "Widower",
}

export enum EducationLevel {
  JHS = "JHS",
  SHS = "SHS",
  Tertiary = "Tertiary",
  None = "None",
}

export enum residentialStatus {
  Resident = "Resident",
  Nonresidents = "Non-resident",
}

export enum employmentStatus {
  Employed = "Employed",
  Unemployed = "Unemployed",
  SelfEmployed = "Self employed",
}

export enum Surplus {
  Save = "Save",
  Invest = "Invest",
  Spend = "Spend",
  None = "None",
}

export enum response {
  YES = "Yes",
  No = "No",
}

export enum Source {
  Bank = "Bank",
  FriendAndFamily = "Friend and family",
  SavingAndLoans = "Savings and Loans",
}
export interface Iregistration {
  fullname: string;
  gender: gender;
  age: number;
  maritalStatus: MaritalStatus;
  educationLevel: EducationLevel;
  residentialStatus: residentialStatus;
  residentialAddress: string;
  NoYearsAtResidence: number;
  face: string;
  ghanaCardFront: string;
  ghanaCardBack: string;
  employmentStatus: employmentStatus;
  Occupation: string;
  Employer: string;
  Income: number;
  Savings: number;
  Surplus: Surplus;
  NoOfDependants: number;
  CurrentlyServingaLoan: response;
  SourceOfLoan: Source;
  loanAmount: number;
  loanApproved: response;
  amountApproved: number;
  defaulted: response;
  NoMonthsDefaulted: number;
  user: Types.ObjectId;
}

export interface Iguarantor {
  FullName: String;
  Loan: Types.ObjectId;
  Address: String;
  phoneNumber: String;
}

export enum userRole {
  Admin = "Admin",
  regionalAgent = "regionalAgent",
  Agent = "Agent",
}

export interface IAdmin {
  FullName: string;
  email: string;
  password: string;
  role: userRole;
  Phonenumber: String;
}

export enum loanStatus {
  pending = "pending",
  approved = "approved",
  accepted = "accepted",
  denied= "denied",
  paid = "paid",
  defaulted = "defaulted",
}

export interface ILoan {
  principal: number;
  interestrate: number;
  charges: number;
  repaymentDate: Date;
  loanStatus: loanStatus;
  repaymentAmount: number;
  loanType:string
  repaymentPeriod:number ;
  AmountPaid: number;
  AmountOwed: number;
  client: Types.ObjectId;
  Guarantors: Types.DocumentArray<Types.ObjectId>;
  DateApproved: Date;
  DateAccepted: Date;
  DatePaid: Date;
}

export interface IAPR {
  interestRate: number;
  charges: number;
}

export interface IAprMethods {
  calcApr(value: number): number;
}
