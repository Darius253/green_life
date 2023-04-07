import { isJSDocThisTag } from "typescript";
import { moneyParams, resendOtp, sendMessageparams, verifyotpparams } from "./hubtel.interface";
import axios, { AxiosError } from 'axios' ;
import { BadAuthError } from "@utils/BadAuthError";

export class hubtelService{

 
    
 static  axiosRequest(url:string , data:any ){
        console.log(data)

    return  axios({
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



    }

    static async makeRequest(url:string , data:any){
       
      try{

    const res = await this.axiosRequest(url, data);

    return res.data.data ;
      }catch(error:any){
  
          if(error.response.status === 500){
            throw new Error("")
          }
          
          throw new BadAuthError(error.response.data.message , 400 )


      }


    }

    static async sendotp(phoneNumber:string){
        
  
        const url = "https://api-otp.hubtel.com/otp/send";
        const data = {
          From: "buddybuss",
          phoneNumber: phoneNumber,
          countryCode: "GH",
        };
  

        return await this.makeRequest(url , data) ;
     
    
       
      
     

    }

    static async verifyotp(params:verifyotpparams){
         
    
            const url = "https://api-otp.hubtel.com/otp/verify";

          

            
     
            return await this.makeRequest(url, params);

      

    }

    static async resendOtp(params:resendOtp){

    
                  const url = "https://api-otp.hubtel.com/otp/resend";
              

             return await this.makeRequest(url, params);
    }

    static async sendMessage(params:sendMessageparams){
         
     
           const url = "https://smsc.hubtel.com/v1/messages/send";


         return await this.makeRequest(url , params)
       
    }

    static async sendMoney(params:moneyParams){
   
          const url = `https://consumer-smrmapi.hubtel.com/send-money/${params.mobileNumber}`;
 
        return await this.makeRequest(url, params);
    }
    
    static async receiveMoney(params:moneyParams){
    
         const url = `https://consumer-smrmapi.hubtel.com/request-money/${params.mobileNumber}`;


         return await this.makeRequest(url, params)
    }

  }
