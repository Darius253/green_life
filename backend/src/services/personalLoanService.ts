import { Loan } from "../models/Loan";
import { Request, Response } from "express";
import { LoanService } from "./loanService";
import { BadAuthError } from "../utils/BadAuthError";
import { policyRepo } from "redisClient";
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
import { returnAppMessage , returnMessage } from "@utils/message";
import { User } from "@models/User";
class PersonalLoanService extends LoanService {
  async createRequest(req: Request, res: Response) {
    console.log(req.files);
    const user = await Client.findById(req.user?.id);
    if (!user) {
      throw new BadAuthError("Not authorized", 401);
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
          user: req.user?.id,
        });
        console.log(userRegistration);
        if (!userRegistration) {
          if (!face && !ghanaCardBack && !ghanaCardFront) {
            throw new BadAuthError("Bad request error", 401);
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
    } else if (
      principal > policy.noRegisterationAmountCap! &&
      principal <= policy.noGurantorAmountCap!
    ) {
      //take all the registration details but no guarantors
      //find user

      if (!user.registered) {
        //validate user input

        await checkReg(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationErrors(errors.array());
        }
        const registration = await Registration.findOne({ user: req.user?.id });
        //check if user is registered
        if (!registration) {
          if (!face && !ghanaCardBack && !ghanaCardFront) {
            throw new BadAuthError("Bad request error", 401);
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
    } else {
      await checkguarantors(req);
      // throwError(req) ;

      if (!user.registered) {
        await checkReg(req);

        // throwError(req)
        const registration = await Registration.findOne({ user: req.user?.id });
        //check if user is registered
        console.log("rnrifnonorern");
        if (!registration) {
          if (!face && !ghanaCardBack && !ghanaCardFront) {
            console.log("ere");
            throw new BadAuthError("Bad request error", 401);
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
        // user.set("registered", true);
        user.registered = true;
        await user.save();
      }

     
    }
     const loanRequest = new Loan({
       principal: +principal,
       interestrate: +interestrate,
       loanType: LOANTYPE.PERSONALLOAN,
       loanterm: +loanterm,
       client: req.user?.id,
     });

     await loanRequest.save();

     if(req.body.quarantor1fullname && req.body.guarantor2fullname){
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
     }

     // await Guarantor.create(guarantors); ;
    
     await hubtelService.sendMessage({
      to: user.phoneNumber ,
      from:"buddybuss",
      content: returnAppMessage(loanRequest._id.toString() , loanRequest.principal.toFixed(2) ).toUpperCase()
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
      throw new BadAuthError("Loan does not exist or deleted", 400);
    }


    if (loan?.client.toString() !== req.user.id) {
      throw new BadAuthError("user is not authorized", 400);
    }

    if (loan.loanStatus !== loanStatus.APPROVED) {
      throw new BadAuthError("loan is no more pending", 400);
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
    //fetch loan
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
  } // only accept if loan is approved think through

  async approveRequest(req: Request, res: Response) {
    const loan = await Loan.findById(req.params.id).populate<{
      client: Iclient;
    }>("client");


    if (!loan) {
      throw new BadAuthError("Loan does not exist or deleted", 400);
    }

    if (loan.loanStatus !== loanStatus.PENDING) {
      throw new BadAuthError("loan is no more pending", 400);
    }

    loan.loanStatus = loanStatus.APPROVED;
    loan.DateApproved = moment().toDate();
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
      throw new BadAuthError("Loan does not exist or deleted", 400);
    }
  
    if (loan.loanStatus !== loanStatus.PENDING) {
      throw new BadAuthError("loan is no more pending", 400);
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
    res.send({
      success: true,
      data: {
        loan,
      },
    });
  } //deny request if loan approved


 async AgentCreateRequest(req:Request ,res:Response){
  console.log(req.files);
  const user = await Client.findById(req.params.id);
  if (!user) {
    throw new BadAuthError("Not authorized", 401);
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
          throw new BadAuthError("Bad request error", 401);
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
  } else if (
    principal > policy.noRegisterationAmountCap! &&
    principal <= policy.noGurantorAmountCap!
  ) {
    //take all the registration details but no guarantors
    //find user

    if (!user.registered) {
      //validate user input

      await checkReg(req);

    
      const registration = await Registration.findOne({ user: user._id });
      //check if user is registered
      if (!registration) {
        if (!face && !ghanaCardBack && !ghanaCardFront) {
          throw new BadAuthError("Bad request error", 401);
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
  } else {
    await checkguarantors(req);
    // throwError(req) ;

    if (!user.registered) {
      await checkReg(req);

      // throwError(req)
      const registration = await Registration.findOne({ user: user._id });
      //check if user is registered
      console.log("rnrifnonorern");
      if (!registration) {
        if (!face && !ghanaCardBack && !ghanaCardFront) {
          console.log("ere");
          throw new BadAuthError("Bad request error", 401);
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
      // user.set("registered", true);
      user.registered = true;
      await user.save();
    }
  }
  const loanRequest = new Loan({
    principal: +principal,
    interestrate: +interestrate,
    loanType: LOANTYPE.PERSONALLOAN,
    loanterm: +loanterm,
    client: user._id , 
    clientAgent:req.user.id
  });

  await loanRequest.save();

  if (req.body.quarantor1fullname && req.body.guarantor2fullname) {
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
  }

  // await Guarantor.create(guarantors); ;

  await hubtelService.sendMessage({
    to: user.phoneNumber,
    from: "buddybuss",
    content: returnAppMessage(
      loanRequest._id.toString(),
      loanRequest.principal.toFixed(2)
    ).toUpperCase(),
  });

  return res.send({
    success: true,
    data: {
      loanRequest,
    },
  });
  }
}

export const personalLoanService = new PersonalLoanService();
