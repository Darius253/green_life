import { Document, Types } from "mongoose";
import { Type } from "typescript";

export interface Iauth {
  name?: string;
  email: string;
  phoneNumber: string;
  lock: userlock;
  otpLock: otpLock;
  password: string;
  otp: number | null;
  verified: boolean;
  role: userRole;
  session:Types.Array<string>;
}
export interface Iclient extends Iauth {
  name: string;

  registered: boolean;
  registration: Types.ObjectId;
}

export interface Iuser extends Iauth {
  FullName: string;
}

export interface Authclass {
  userLocked(): boolean;
  otpLocked(): boolean;
}
export interface userlock {
  tries: number;
  expiresAt: Date | null;
}

export interface otpLock {
  otpTries: number;
  expiresAt: Date | null;
}

export enum gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  NULL = "null",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widow = "Widow",
  NULL= "null",
  Widower = "Widower",
}

export enum EducationLevel {
  JHS = "JHS",
  SHS = "SHS",
  Tertiary = "Tertiary",
  None = "None",
  NULL = "null",
}

export enum residentialStatus {
  Resident = "Resident",
  NULL = "null",
  Nonresidents = "Non-resident",
}

export enum employmentStatus {
  Employed = "Employed",
  NULL = "null",
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
  YES = "YES",
  No = "NO",
  NULL ="null"
}

export enum Source {
  Bank = "Bank",
  FriendAndFamily = "Friend and family",
  SavingAndLoans = "Savings and Loans",
  NULL = "null"
}

export enum registerationRepresentativePostion{
  OWNER= "Owner",
  SHAREHOLDER=  "ShareHolder" , 
  DIRECTOR  = "director"
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
  businessName:string ;
  representativeName:string ; 
  businessRegistrationNumber:string;
  businessTin:string;
  representativePosition:registerationRepresentativePostion , 
  businessCertificate:string ; 
  form3:string;
  municipalCertificate:string ;
  taxReturns:string ;
  bankStatement:string ;
  financialStatement:string ;
  numberofBeneficialOwners:number;
  numberofShareHolders:number ;
  numberofDirectors:number;
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

export enum guarantorRole{
  BENEFICIALOWNERS =  "beneficialowners" , 
  SHAREHOLDER =  "shareholder" , 
  DIRECTOR ="director"
}
export interface Iguarantor {
  FullName: String;
  Loan: Types.ObjectId;
  Address: String; 
  role: guarantorRole
  phoneNumber: String;
}


export enum userRole {
  ADMIN = "ADMIN",
  REGIONALAGENT = "REGIONALAGENT",
  AGENT = "AGENT",
}

export enum loanStatus {
  PENDING = "pending",
  APPROVED = "approved",
  ACCEPTED = "accepted",
  DENIED = "denied",
  PAID = "paid",
  DEFAULTED = "defaulted",
  REJECTED= "rejected"
}
export enum LOANTYPE{
  PERSONALLOAN = "Personal loan" ,
  SMELOAN =  "SmesLoan"
}

export enum loanInstallmentStatus{

  PAID="paid" ,
  DEFAULTED ="defaulted" ,
    UNPAID= "unpaid"
}

export interface IloanInstallment{
 
  amount:number ; 
  dueDate:Date ; 
  remainingBalance:number ;
  status: loanInstallmentStatus
  latePayment:boolean
  lastPaymentDate:Date


}
export interface ILoan {
  principal: number;
  interestrate: number;
  monthlyinterestRate:number;
  charges: number;
  lastRepaymentDate: Date;
  loanStatus: loanStatus;
  repaymentAmount: number;
  loanType: LOANTYPE;
  loanterm: number;
  AmountPaid: number;
  remainingBalance: number;
  client: Types.ObjectId;
  installment:IloanInstallment[]
  monthlyPayment:number
  DateApproved: Date;
  DateAccepted: Date;
  clientAgent?:Types.ObjectId ; 
  DatePaid: Date;
}

export interface Ipolicy {
  interestRate: number;
  noRegisterationAmountCap: number;
  noGurantorAmountCap: number;
  personalloanAmountCap: number;
  personalloanterm: number;
}
