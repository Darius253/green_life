

export interface verifyotpparams{

    requestId:string ;
    prefix:string;
    code:string
}

export interface sendOtpparams{

    to:string ; 
    content:string ;
}

export interface moneyParams{
    mobileNumber:string ;
    amount:number ;
    title:string ;
    description:string ;
    clientReference:string ;
    callbackUrl:string;
}