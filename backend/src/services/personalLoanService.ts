import { Loan } from "@models/Loan";
import { Request, Response } from "express";
import { LoanService } from "./loanService";
import { BadAuthError } from "@utils/BadAuthError";
import { policyRepo } from "redisClient";
import { Registration } from "@models/Registration";
import { LOANTYPE } from "@models/models.interface";
import { User } from "@models/User";
import { Client } from "@models/Client";
import { Guarantor } from "@models/Guarantor";
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

    //@ts-ignore
    const face = req.files["face"][0]["path"];
    //@ts-ignore
    const ghanaCardBack = req.files["ghanaCardBack"][0]["path"];
    //@ts-ignore
    const ghanaCardFront = req.files["ghanaCardFront"][0]["path"];
    let { principal, interestrate, loanterm } = req.body;
    console.log(req.body);
    principal = parseFloat(principal).toFixed(2);
    if (req.body.principal <= policy.noRegisterationAmountCap!) {
      //  console.log(ghanaCardBack[0].path)
      // principal = principal.slice(principal.indexOf(".")).length > 3 ? principal : principal+".00"
    if(!user.registered){

        const userRegistration = await Registration.findOne({
          user: req.user?.id,
        });
        console.log(userRegistration);
        if (!userRegistration) {
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

      const loanRequest = new Loan({
        principal: +principal,
        interestrate: +interestrate,
        loanType: LOANTYPE.PERSONALLOAN,
        loanterm: +loanterm,
        client: req.user?.id,
      });

      await loanRequest.save();

      //send user a message

      return res.send({
        success: true,
        data: {
          loanRequest,
        },
      });
    } else if (
      req.body.principal > policy.noRegisterationAmountCap! &&
      req.body.principal <= policy.noGurantorAmountCap!
    ) {
      //take all the registration details but no guarantors
      //find user

      if (!user.registered) {
        const registration = await Registration.findOne({ user: req.user?.id });
        //check if user is registered
        if (!registration) {
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
          await registration.updateOne(
            {},
            { $set: { ...req.body }, new: true }
          );
        }

        //set user to registered
        user.set("registered", true);
      }
      //find users registration
      //if registration edit if necessary

      //if no registration create new

      //create loan request and send to user
      const loanRequest = new Loan({
        principal: +principal,
        interestrate: +interestrate,
        loanType: LOANTYPE.PERSONALLOAN,
        loanterm: +loanterm,
        client: req.user?.id,
      });

      await loanRequest.save();

      return res.send({
        success: true,
        data: {
          loanRequest,
        },
      });
    } else {
    
    

      if (!user.registered) {
        const registration = await Registration.findOne({ user: req.user?.id });
        //check if user is registered
        if (!registration) {
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
          await registration.updateOne(
            {},
            { $set: { ...req.body }, new: true }
          );
        }


        //set user to registered
        user.set("registered", true);
      }

      const guarantors = [
        {
          FullName: req.body.guarantor1fullname,
          phoneNumber: req.body.guarantor1phoneNumber,
        },

        {
          FullName: req.body.guarantor2fullname,
          phoneNumber: req.body.guarantor2phoneNumber,
        },
      ];

    
        // await Guarantor.create(guarantors); ; 
      await    Guarantor.create(guarantors ) ;
       
  const loanRequest = new Loan({
        principal: +principal,
        interestrate: +interestrate,
        loanType: LOANTYPE.PERSONALLOAN,
        loanterm: +loanterm,
        client: req.user?.id,
      });

      await loanRequest.save();

      return res.send({
        success: true,
        data: {
          loanRequest,
        }})

      
    }

  
  }

  async rejectRequest(req: Request, res: Response) {} //reject request if loan status is pending

  async acceptloan(req: Request, res: Response) {}// only accept if loan is approved think through

  async approveRequest(req: Request, res: Response) {} // approve request if loan status is pending

  async denyloan(req: Request, res: Response) {} //deny request if loan approved
}

export const personalLoanService = new PersonalLoanService();
