import  {Types} from 'mongoose'
export interface Iuser{

 name:string ;
 email:string;
 phoneNumber:string ;
 password:string ;
 registered:boolean
 registration:Types.ObjectId


} 

export enum gender{
    Male = "Male" ,
    Female ="Female" ,
    Other=  "Other"
}

export enum MaritalStatus{
    Single="Single" ,
    Married="Married" ,
    Divorced= "Divorced",
    Widow = "Widow" ,
    Widower = "Widower" 
}

export enum EducationLevel{
    JHS = "JHS" ,
    SHS ="SHS" ,
    Tertiary ="Tertiary" ,
    None = "None"
}

export enum residentialStatus{
    Resident = "Resident",
    Nonresidents= "Non-resident"
}

export enum employmentStatus {
    Employed = "Employed" ,
    Unemployed ="Unemployed",
    SelfEmployed= "Self employed"
}

export enum Surplus {
   Save = "Save" ,
   Invest = "Invest" ,
   Spend= "Spend" ,
   None = "None"
}

export enum response{
    YES  ="Yes" ,
    No = "No"
} 

export enum Source{
    Bank ="Bank" ,
    FriendAndFamily ="Friend and family",
    SavingAndLoans = "Savings and Loans"
}
export interface Iregistration{

    fullName: string;
    gender: gender ; 
    age:number;
    maritalStatus: MaritalStatus , 
    educationLevel:EducationLevel , 
    residentialStatus: residentialStatus,
    residentialAddress:string ,
    NoYearsAtResidence:number ,
    face:string ;
    ghanaCardFront:string;
    ghanaCardBack:string ;
    employmentStatus:employmentStatus ,
    Occupation:string ;
    Employer:string ;
    Income:number;
    Savings:number ;
    Surplus: Surplus ;
    NoOfDependants:number;
    CurrentlyServingaLoan:response ;
    SourceOfLoan:Source ;
    loanAmount :number;
    loanApproved:response ;
    amountApproved:number ;
    defaulted: response; 
    NoMonthsDefaulted:number ;


}