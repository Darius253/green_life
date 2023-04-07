

export interface verifyotpparams{

    requestId:string ;
    prefix:string;
    code:string
}

export interface sendMessageparams{
       from:string
    to:string ; 
    content:string ;
}
export interface  resendOtp{

    requestId:string ;
}
export interface moneyParams{
    mobileNumber:string ;
    amount:number ;
    title:string ;
    description:string ;
    clientReference:string ;
    callbackUrl:string;
}