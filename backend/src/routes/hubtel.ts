import {Router ,Request, Response} from 'express';
import { hubtelService } from '../services/huntelService';
import {moneyParams, sendMessageparams} from '../services/hubtel.interface'
import { verifyotpparams } from '../services/hubtel.interface';


const Route= Router() ;


Route.route("/sendotp").post(async(req:Request , res:Response)=>{
 
    const {phoneNumber} =  req.body ;  
      
     
   const data=  await hubtelService.sendotp(phoneNumber) ;

 


   
   res.send({
    data
   })

     


 

}) ; 

Route.route("/verifyotp").post(async(req:Request ,res:Response)=>{
 
     
    const params:verifyotpparams = req.body ;

 console.log(params)
    const data  = await hubtelService.verifyotp({
        requestId:req.body.requestId  ,
         prefix:req.body.prefix,
        code:req.body.code 
       
    }) ;

    res.send({
        data ,
    })






})





Route.route("/resendotp").post(async (req: Request, res: Response) => {
  const {requestId} = req.body;

  const data = await hubtelService.resendOtp({requestId});

  res.send({
    data,
  });
});


Route.route("/sendMessage").post(async (req: Request, res: Response) => {
  const params:sendMessageparams = req.body;

  const data = await hubtelService.sendMessage(params);

  res.send({
    data,
  });
});

Route.route("/sendMoney").post(async (req: Request, res: Response) => {
  const params: moneyParams = req.body;

  const data = await hubtelService.sendMoney(params);

  res.send({
    data,
  });
});


Route.route("/receiveMoney").post(async (req: Request, res: Response) => {
  const params: moneyParams = req.body;

  const data = await hubtelService.receiveMoney(params);

  res.send({
    data,
  });
});


Route.route("/callback").post(async (req: Request, res: Response) => {
  
  console.log(req.body) ; 
     
  res.send({})

});

export {Route as hubtelRoute}


