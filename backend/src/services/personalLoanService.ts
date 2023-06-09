import { Loan } from "../models/Loan";
import { Request, Response } from "express";
import { LoanService } from "./loanService";
import { BadAuthError } from "../utils/BadAuthError"
import { policyRepo } from "../redisClient";
import { Registration } from "../models/Registration";
import { Iclient, LOANTYPE, loanStatus } from "../models/models.interface";
// import { User } from "@models/User";
import moment from "moment";
import { Client } from "../models/Client";
import { Guarantor } from "../models/Guarantor";
import { body, validationResult } from "express-validator";
import { checkReg, checkguarantors } from "../utils/checkReg";
import { ValidationErrors } from "../utils/validationError";
import { hubtelService } from "./huntelService";
import { returnAppMessage , returnMessage } from "../utils/message";
import { ACTIONS } from "../actions";
import { logger } from "../utils/logger";
class PersonalLoanService extends LoanService {
  async createRequest(req: Request, res: Response) {
    console.log(req.files , "FFEFE");
    let user ;

    if(req.user.role){
      user  =  await Client.findById(req.params.id)
    }else {

      user = await Client.findById(req.user?.id);
    }
console.log(user)
     
    if (!user) {
      throw new BadAuthError("Not authorized", 401 ,ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS);
    }
console.log(policyRepo)
    const policy = await policyRepo.search().returnFirst();
  console.log(policy)
    if (!policy) {
      throw new Error("");
    }
    let face, ghanaCardBack, ghanaCardFront;
    console.log(req.files?.keys);
    //@ts-ignore
    if (
      //@ts-ignore
      req.files["face"] &&
      //@ts-ignore
      req.files["ghanaCardBack"] &&
      //@ts-ignore&
      req.files["ghanaCardFront"]
    ) {
      //@ts-ignore
      face = req.files["face"][0]["path"];
      //@ts-ignore
      ghanaCardBack = req.files["ghanaCardBack"][0]["path"];
      //@ts-ignore
      ghanaCardFront = req.files["ghanaCardFront"][0]["path"];
    }

    let { principal, interestrate, loanterm } = req.body;
    console.log(req.body);

    if (principal <= policy.noRegisterationAmountCap!) {
      //  console.log(ghanaCardBack[0].path)
      // principal = principal.slice(principal.indexOf(".")).length > 3 ? principal : principal+".00"
      if (!user.registered) {
        const userRegistration = await Registration.findOne({
          user: req.user?.id,
        });
        console.log(userRegistration);
        if (!userRegistration) {
          if (!face && !ghanaCardBack && !ghanaCardFront) {
            throw new BadAuthError("Bad request error", 400 ,ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS);
          }

          const newRegistration = new Registration({
            ghanaCardBack: ghanaCardBack,
            ghanaCardFront: ghanaCardFront,

            face: face,
            user: req.user?.id,
          });

          await newRegistration.save();
        }
      }
      console.log(req.body);

      // const loanRequest = new Loan({
      //   principal: +principal,
      //   interestrate: +interestrate,
      //   loanType: LOANTYPE.PERSONALLOAN,
      //   loanterm: +loanterm,
      //   client: req.user?.id,
      // });

      // await loanRequest.save();

      // //send user a message

      // return res.send({
      //   success: true,
      //   data: {
      //     loanRequest,
      //   },
      // });
    } else {


      if(principal >= policy.noGurantorAmountCap!){

      await  checkguarantors(req) ;
      }
          
     
      

    
    
      
      //take all the registration details but no guarantors
      //find user

      if (!user.registered) {
        //validate user input

        await checkReg(req);

        const registration = await Registration.findOne({ user: req.user?.id });
        //check if user is registered
        if (!registration) {
          if (!face && !ghanaCardBack && !ghanaCardFront) {
            throw new BadAuthError("Bad request error", 400 ,ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS);
          }
          //register user if not registered

          const register = await new Registration({
            ...req.body,
            face,
            ghanaCardBack,
            ghanaCardFront,
            user: req.user?.id,
          }).save();
        } else {
          // if user is not registered but registeration exist then update registration details;
          await Registration.findByIdAndUpdate(registration._id, {
            $set: { ...req.body },
            new: true,
          });
        }

        //set user to registered
        user.registered = true;
        await user.save();
      }

    }
      //find users registration
      //if registration edit if necessary

      //if no registration create new

      //create loan request and send to user
      // const loanRequest = new Loan({
      //   principal: +principal,
      //   interestrate: +interestrate,
      //   loanType: LOANTYPE.PERSONALLOAN,
      //   loanterm: +loanterm,
      //   client: req.user?.id,
      // });

      // await loanRequest.save();

      // return res.send({
      //   success: true,
      //   data: {
      //     loanRequest,
      //   },
      // });
    // } else {
    //   await checkguarantors(req);
    //   // throwError(req) ;

    //   if (!user.registered) {
    //     await checkReg(req);

    //     // throwError(req)
    //     const registration = await Registration.findOne({ user: req.user?.id });
    //     //check if user is registered
    //     console.log("rnrifnonorern");
    //     if (!registration) {
    //       if (!face && !ghanaCardBack && !ghanaCardFront) {
    //         console.log("ere");
    //         throw new BadAuthError("Bad request error",  ,ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS401);
    //       }
    //       //register user if not registered
    //       const register = await new Registration({
    //         ...req.body,
    //         face,
    //         ghanaCardBack,
    //         ghanaCardFront,
    //         user: req.user?.id,
    //       }).save();
    //     } else {
    //       // if user is not registered but registeration exist then update registration details;
    //       await Registration.findByIdAndUpdate(registration._id, {
    //         $set: { ...req.body },
    //         new: true,
    //       });
    //     }

    //     //set user to registered
    //     // user.set("registered", true);
    //     user.registered = true;
    //     await user.save();
    //   }

     
    // }
     const loanRequest = new Loan({
       principal: +principal,
       interestrate: interestrate,
       loanType: LOANTYPE.PERSONALLOAN,
       loanterm: +loanterm,
       client: req.user?.id,
       clientAgent: user.agent._id , 
       requestedBy: req.user.role || 'USER'
     });

     await loanRequest.save();

     const promises = [] ;
     if(req.body.guarantor1fullname && req.body.guarantor2fullname){
       const guarantors = [
         {
           FullName: req.body.guarantor1fullname,
           phoneNumber: req.body.guarantor1phoneNumber,
           Loan: loanRequest,
         },

         {
           FullName: req.body.guarantor2fullname,
           phoneNumber: req.body.guarantor2phoneNumber,
           Loan: loanRequest,
         },
       ];
        
     const result=   await Guarantor.create(guarantors); 

       
        for (let guarantor of result) {
         await hubtelService.sendMessage({
            to: guarantor.phoneNumber.toString(),
            from: "buddybuss",
            content: "hello world",
          });
        }

     }


     
    
 
   await hubtelService.sendMessage({
      to: user.phoneNumber,
      from: "buddybuss",
      content: returnAppMessage(
        loanRequest._id.toString(),
        loanRequest.principal.toFixed(2)
      ).toUpperCase(),
    })
  


     

     return res.send({
       success: true,
       data: {
         loanRequest,
       },
     });
  }

  async rejectRequest(req: Request, res: Response) {
    const loan = await Loan.findById(req.params.id).populate<{client:Iclient}>("client");
   
    if (!loan) {
      throw new BadAuthError("Loan does not exist or deleted", 401, ACTIONS.REJECT_LOAN_ATTEMPTS);
    }


    if (loan?.client.toString() !== req.user.id) {
      throw new BadAuthError("user is not authorized", 401, ACTIONS.REJECT_LOAN_ATTEMPTS);
    }

    if (loan.loanStatus !== loanStatus.APPROVED) {
      throw new BadAuthError("loan is no more pending", 401, ACTIONS.REJECT_LOAN_ATTEMPTS);
    }

    loan.loanStatus = loanStatus.REJECTED;

    await loan.save();

    //send message to  client ; 
       await hubtelService.sendMessage({
      to: loan.client.phoneNumber,
      from:"buddybuss",
      content: returnMessage(loan._id.toString() , loan.principal.toFixed(2), "rejected"  ).toUpperCase()
     })

    res.send({
      success: true,
      data: {
        loan,
      },
    });
  } //reject request if loan status is pending

  async acceptloan(req: Request, res: Response) {
//     //fetch loan
//     const loan =   await Loan.findById(req.params.id) ;
//     if(!loan){
//       throw new BadAuthError("Loan does not exist or deleted", 404, ACTIONS.APPROVE_LOAN_ATTEMPTS);
//     }

//     if(loan.client._id.toString() !== req.user.id){
//        throw new BadAuthError(
//          "user is not authorized",
//          401,
//          ACTIONS.REJECT_LOAN_ATTEMPTS
//        );

  }

// let newLoan ;    
//     const currentLoan =  await Loan.findOne({client:req.user.id , loanStatus:loanStatus.INPROGRESS}) ; 

//     if(currentLoan){

//     }
  
    
  
  




    //change loan status
    //create the first installment
    //change the dateAccepted
    //Date paid
    //amount paid
    //repaymetAmount
    //remainingBalace
    //send api reques to send money
    //create first installment sent
    //send res
  // only accept if loan is approved think through

  async approveRequest(req: Request, res: Response) {
    const loan = await Loan.findById(req.params.id).populate<{
      client: Iclient;
    }>("client");

    const loanInprogress =  await Loan.findOne({loanStatus:loanStatus.INPROGRESS})


    if (!loan) {
      throw new BadAuthError("Loan does not exist or deleted", 401, ACTIONS.APPROVE_LOAN_ATTEMPTS);
    }

    if (loan.loanStatus !== loanStatus.PENDING) {
      throw new BadAuthError("loan is no more pending", 401, ACTIONS.APPROVE_LOAN_ATTEMPTS);
    }



  if(!loanInprogress){
loan.loanStatus = loanStatus.APPROVED;
loan.DateApproved = moment().toDate();
  }
   
   else  if(loanInprogress && loanInprogress.remainingBalance <=  (0.5 * loanInprogress.repaymentAmount) && loan.principal > loanInprogress.remainingBalance && loanInprogress.installment.length < loanInprogress.loanterm-1){

loan.loanStatus = loanStatus.APPROVED
loan.DateApproved = moment().toDate();
    }
    else{

      throw new BadAuthError('loan topup not allowed' , 401 , ACTIONS.APPROVE_LOAN_ATTEMPTS)
    }


    
    await loan.save();

    //send message to  client ;
   await hubtelService.sendMessage({
     to: loan.client.phoneNumber,
     from: "buddybuss",
     content: returnMessage(
       loan._id.toString(),
       loan.principal.toFixed(2),
       "approved"
     ).toUpperCase(),
   });

    logger.info({
      device: {
        ip: req.ip,
        agent: req.headers["user-agent"],
        method: req.method,
        url: req.url,
      },
      action: ACTIONS.APPROVE_LOAN_ACTION,
      user: req.user,
      loan:loan
    });
    res.send({
      success: true,
      data: {
        loan,
      },
    });
  } // approve request if loan status is pending

  async denyloan(req: Request, res: Response) {
    const loan = await Loan.findById(req.params.id).populate<{client:Iclient}>("client");

    if (!loan) {
      throw new BadAuthError("Loan does not exist or deleted", 401 , ACTIONS.DENY_LOAN_ATTEMTPS);
    }
  
    if (loan.loanStatus !== loanStatus.PENDING) {
      throw new BadAuthError("loan is no more pending", 401 , ACTIONS.DENY_LOAN_ATTEMTPS);
    }

    loan.loanStatus = loanStatus.DENIED;

    await loan.save();

    //send message to  client ;
 await hubtelService.sendMessage({
   to: loan.client.phoneNumber,
   from: "buddybuss",
   content: returnMessage(
     loan._id.toString(),
     loan.principal.toFixed(2),
     "denied"
   ).toUpperCase(),
 });
 
  logger.info({
    device: {
      ip: req.ip,
      agent: req.headers["user-agent"],
      method: req.method,
      url: req.url,
    },
    action: ACTIONS.DENY_LOAN_ATTEMTPS,
    user: req.user,
    loan
  });
    res.send({
      success: true,
      data: {
        loan,
      },
    });
  } //deny request if loan approved


 async agentCreateRequest(req:Request ,res:Response){
  console.log(req.files);
  const user = await Client.findById(req.params.id);
  if (!user) {
    throw new BadAuthError("Not authorized", 401 , ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS);
  }

  const policy = await policyRepo.search().returnFirst();

  if (!policy) {
    throw new Error("");
  }
  let face, ghanaCardBack, ghanaCardFront;
  console.log(req.files?.keys);
  //@ts-ignore
  if (
    //@ts-ignore
    req.files["face"] &&
    //@ts-ignore
    req.files["ghanaCardBack"] &&
    //@ts-ignore&
    req.files["ghanaCardFront"]
  ) {
    //@ts-ignore
    face = req.files["face"][0]["path"];
    //@ts-ignore
    ghanaCardBack = req.files["ghanaCardBack"][0]["path"];
    //@ts-ignore
    ghanaCardFront = req.files["ghanaCardFront"][0]["path"];
  }

  let { principal, interestrate, loanterm } = req.body;
  console.log(req.body);

  if (principal <= policy.noRegisterationAmountCap!) {
    //  console.log(ghanaCardBack[0].path)
    // principal = principal.slice(principal.indexOf(".")).length > 3 ? principal : principal+".00"
    if (!user.registered) {
      const userRegistration = await Registration.findOne({
        user: user._id,
      });
      console.log(userRegistration);
      if (!userRegistration) {
        if (!face && !ghanaCardBack && !ghanaCardFront) {
          throw new BadAuthError(
            "Bad request error",
            400,
            ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS
          );
        }

        const newRegistration = new Registration({
          ghanaCardBack: ghanaCardBack,
          ghanaCardFront: ghanaCardFront,

          face: face,
          user: user._id,
        });

        await newRegistration.save();
      }
    }
    console.log(req.body);

    // const loanRequest = new Loan({
    //   principal: +principal,
    //   interestrate: +interestrate,
    //   loanType: LOANTYPE.PERSONALLOAN,
    //   loanterm: +loanterm,
    //   client: req.user?.id,
    // });

    // await loanRequest.save();

    // //send user a message

    // return res.send({
    //   success: true,
    //   data: {
    //     loanRequest,
    //   },
    // });
  } else{
    
   if( principal >= policy.noGurantorAmountCap!){
    await checkguarantors(req) ; //check for guarantors if principal is greater than noGuarantoramountcap
   }
  
    //take all the registration details but no guarantors
    //find user

    if (!user.registered) {
      //validate user input

      await checkReg(req);

    
      const registration = await Registration.findOne({ user: user._id });
      //check if user is registered
      if (!registration) {
        if (!face && !ghanaCardBack && !ghanaCardFront) {
          throw new BadAuthError(
            "Bad request error",
            401,
            ACTIONS.REQUEST_PERSONAL_LOAN_ATTEMPTS
          );
        }
        //register user if not registered

        const register = await new Registration({
          ...req.body,
          face,
          ghanaCardBack,
          ghanaCardFront,
          user: user._id,
        }).save();
      } else {
        // if user is not registered but registeration exist then update registration details;
        await Registration.findByIdAndUpdate(registration._id, {
          $set: { ...req.body },
          new: true,
        });
      }

      //set user to registered
      user.registered = true;
      await user.save();
    }

  }
    //find users registration
    //if registration edit if necessary

    //if no registration create new

    //create loan request and send to user
    // const loanRequest = new Loan({
    //   principal: +principal,
    //   interestrate: +interestrate,
    //   loanType: LOANTYPE.PERSONALLOAN,
    //   loanterm: +loanterm,
    //   client: req.user?.id,
    // });

    // await loanRequest.save();

    // return res.send({
    //   success: true,1
    //   data: {
    //     loanRequest,
    //   },
    // });
  // } else {
  //   await checkguarantors(req);
  //   // throwError(req) ;

  //   if (!user.registered) {
  //     await checkReg(req);

  //     // throwError(req)
  //     const registration = await Registration.findOne({ user: user._id });
  //     //check if user is registered
  //     console.log("rnrifnonorern");
  //     if (!registration) {
  //       if (!face && !ghanaCardBack && !ghanaCardFront) {
  //         console.log("ere");
  //         throw new BadAuthError("Bad request error", 401);
  //       }
  //       //register user if not registered
  //       const register = await new Registration({
  //         ...req.body,
  //         face,
  //         ghanaCardBack,
  //         ghanaCardFront,
  //         user: user._id,
  //       }).save();
  //     } else {
  //       // if user is not registered but registeration exist then update registration details;
  //       await Registration.findByIdAndUpdate(registration._id, {
  //         $set: { ...req.body },
  //         new: true,
  //       });
  //     }

  //     //set user to registered
  //     // user.set("registered", true);
  //     user.registered = true;
  //     await user.save();
  //   }
  // }
  const loanRequest = new Loan({
    principal: +principal,
    interestrate: +interestrate,
    loanType: LOANTYPE.PERSONALLOAN,
    loanterm: +loanterm,
    client: user._id , 
    clientAgent:req.user.id
  });

  await loanRequest.save();

  const promises = [] ;
  if (req.body.guarantor1fullname && req.body.guarantor2fullname) {
    const guarantors = [
      {
        FullName: req.body.guarantor1fullname,
        phoneNumber: req.body.guarantor1phoneNumber,
        Loan: loanRequest,
      },

      {
        FullName: req.body.guarantor2fullname,
        phoneNumber: req.body.guarantor2phoneNumber,
        Loan: loanRequest,
      }
    ];

   const result =  await Guarantor.create(guarantors); 

      
   for(let guarantor of result){

    promises.push(hubtelService.sendMessage({

      to: guarantor.phoneNumber.toString() , 
      from : 'buddybuss' , 
      content: 'hello world'
    }))
   }
   
   
  }

  

 promises.push( hubtelService.sendMessage({
    to: user.phoneNumber,
    from: "buddybuss",
    content: returnAppMessage(
      loanRequest._id.toString(),
      loanRequest.principal.toFixed(2)
    ).toUpperCase(),
  })) ;

  await Promise.all(promises)

  return res.send({
    success: true,
    data: {
      loanRequest,
    },
  });
  
}




}



export const personalLoanService = new PersonalLoanService();
