import { isJSDocThisTag } from "typescript";
import { moneyParams, sendOtpparams, verifyotpparams } from "./hubtel.interface";
import axios from 'axios' ;

class hubtelService{

 
    
static async  axiosRequest(url:string , data:any ){

  const res =  await  axios({
      method: "POST",
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.HUBTEL_CLIENTID}:${process.env.HUBTEL_CLIENTSECRET}`
          ).toString("base64"),
      },
    });

    return res.data ; 

    }


    static async sendotp(phoneNumber:string){
            const url = "https://api-otp.hubtel.com/otp/send"; 
           const data = {
           
    From:"buddybuss",
    phoneNumber: phoneNumber,
        "countryCode": "GH"


           }; 
     return  await  this.axiosRequest(url  , data)  ;

      
    

    }

    static async verifyotp(params:verifyotpparams){
         const url ="";
       
        return  await this.axiosRequest(url , params) ;

      

    }

    static async sendMessage(params:sendOtpparams){
         
        const url = "https://smsc.hubtel.com/v1/messages/send"; 

        return await this.axiosRequest(url ,params) ;
       
    }

    static async sendMoney(params:moneyParams){
        const url = `https://consumer-smrmapi.hubtel.com/send-money/${params.mobileNumber}`;

        return await this.axiosRequest(url , params) ;

    }
    
    static async receiveMoney(params:moneyParams){
        const url = `https://consumer-smrmapi.hubtel.com/request-money/${params.mobileNumber}`; 

        return await  this.axiosRequest(url,params);
    }





}