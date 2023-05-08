// import { Iclient } from "@models/models.interface";
import { Iclient } from "../models/models.interface";
import { Request, Response } from "express";
import { Client } from "../models/Client";
import { Auth } from "../services/authService";
// import  {User} from  '@models/User'  ;
import { BadAuthError } from "../utils/BadAuthError";
// import { BadAuthError } from '@utils/BadAuthError';
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Payload } from "app.interface";
import moment from "moment";

/* @ web app login controller for login in user returns 
returns user details after checking if user exists.
*/
const customerAuth = new Auth<Iclient>();
export async function login(req: Request, res: Response) {
  return customerAuth.login(req, res, Client);
  //     const  {email ,password} = req.body ;

  //      //check if user exist
  //    const user  = await User.findOne({email}) ;

  //      if(!user){
  //         throw new  BadAuthError("Email or password is incorrect" , 401);
  //      }

  //   //  console.log(user.userLocked());//compare password  , with user's hashpassword.. send error if password is incorrect

  //    if(user.userLocked()){

  //  throw new BadAuthError("Account is locked.Try again "+moment().to(user.lock.expiresAt) , 401);
  //    }

  //   const isValid =  await compare(password , user.password) ;

  //   if(!isValid){

  //      user.lock.tries++ ;

  //      if (user.lock.tries > parseInt(process.env.locked_tries!)+1){
  //       user.lock.expiresAt = moment()
  //         .add(process.env.lock_expiry_tries!, "minutes")
  //         .toDate();
  //      }
  //       else  user.lock.expiresAt = moment()
  //          .add(process.env.lock_expiry!, "minutes")
  //          .toDate();

  //   await user.save()

  //     throw new BadAuthError("Email or password is incorrect", 401);

  //   }

  //        //creat two jwt one as a refreshToken  and one as an accessToken
  //   //create a jwt for user
  //   user.lock.tries = 0 ;
  //   user.lock.expiresAt= null;

  //   //check if otp  max has been reached and throw error
  //     if(user.otpLocked()) {

  //       await user.save() ;
  //       throw new BadAuthError(
  //         "otp limit reached. Try again " + moment().to(user.otpLock.expiresAt),
  //         401
  //       );
  //     }

  //   //generate otp
  //  const otp  = Math.floor(100000 + Math.random() *  900000) ;

  //   //set otp to user
  //   user.otp =  otp ;

  //    await user.save() ;

  // //    const accessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"15m"}) ;
  // //  const refreshToken = jwt.sign({id:user._id , email:user.email} , process.env.JWT_refresh! , {expiresIn:"1hr"}) ;
  // //   //if its from the web app set an http only cookie

  // //             //create an http only cookie containing the refreshToken
  // //     res.cookie("refreshToken" , refreshToken , {httpOnly:true , signed:true}) ;
  // //       return res.status(200).send({
  // //        success: true,
  // //        data: {
  // //          user,
  // //          accessToken
  // //        }
  // //      });

  // //send otp to user for verification

  // res.send({
  //   success:true ,  data:{
  //     otp , userId:user._id
  //   }
  // })
}

export async function resendOtp(req: Request, res: Response) {
  return customerAuth.resendOtp(req, res, Client);
  // const { userId } = req.body;

  // const user = await User.findById(userId);

  // if (!user) {
  //   throw new BadAuthError("user not found ", 400);
  // }

  // user.otp = null;
  // //check if max otp tries have been reached and throw an error ;
  // if (user.otpLocked()) {
  //   await user.save();

  //   throw new BadAuthError(
  //     "otp limit reached. Try again in " + moment().to(user.otpLock.expiresAt),
  //     401
  //   );
  // }
  // //generate new otp  ;

  // const otp = Math.floor(100000 + Math.random() * 900000);

  // user.otp = otp;
  // user.otpLock.otpTries++;
  // user.otpLock.expiresAt = moment()
  //   .add(process.env.otp_expiry, "minutes")
  //   .toDate();

  // await user.save();

  // res.send({
  //   success: true,
  //   data: {
  //     otp,
  //     userId: user._id,
  //   },
  // });
}

export async function verifyOtp(req: Request, res: Response) {
  return customerAuth.verifyOtp(req, res, Client);
  // const { otp, userId } = req.body;

  // const user = await User.findById(userId);

  // //check if user exists;
  // if (!user) {
  //   throw new BadAuthError("User not found", 400);
  // }

  // //check if otp is correct
  // if (user.otp !== otp) {
  //   throw new BadAuthError("Wrong otp", 401);
  // }

  // //set otptries  to zero

  // user.otpLock.otpTries = 0;
  // user.otpLock.expiresAt = null;
  // user.otp = null;

  // //if user is not verified verify user
  // if (!user.verified) {
  //   user.verified = true;

  //   await user.save();
  //   return res.send({
  //     success: true,
  //     data: {
  //       message: "user verified",
  //     },
  //   });
  // }

  // await user.save();
  // //if user is already verified just send user

  // const accessToken = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: "15m" }
  // );
  // const refreshToken = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_refresh!,
  //   { expiresIn: "1hr" }
  // );
  // //if its from the web app set an http only cookie

  // //create an http only cookie containing the refreshToken
  // res.cookie("refreshToken", refreshToken, { httpOnly: true, signed: true });
  // res.send({
  //   success: true,
  //   data: {
  //     user,
  //     accessToken,
  //   },
  // });
}

export async function verifyMobileOtp(req: Request, res: Response) {
  return customerAuth.verifyMobileOtp(req, res, Client);
  // const { otp, userId } = req.body;

  // const user = await User.findById(userId);

  // //check if user exists;
  // if (!user) {
  //   throw new BadAuthError("User not found", 400);
  // }

  // //check if otp is correct
  // if (user.otp !== otp) {
  //   throw new BadAuthError("Wrong otp", 401);
  // }

  // //set otptries  to zero

  // user.otpLock.otpTries = 0;
  // user.otpLock.expiresAt = null;
  // user.otp = null;

  // //if user is not verified verify user
  // if (!user.verified) {
  //   user.verified = true;

  //   await user.save();
  //   return res.send({
  //     success: true,
  //     data: {
  //       message: "user verified",
  //     },
  //   });
  // }

  // await user.save();
  // //if user is already verified just send user

  // const accessToken = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: "15m" }
  // );
  // const refreshToken = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_refresh!,
  //   { expiresIn: "1hr" }
  // );
  // //if its from the web app set an http only cookie

  // //send the user , accessToken and refreshToken to the user
  // res.status(200).send({
  //   success: true,
  //   data: {
  //     user,
  //     accessToken,
  //     refreshToken,
  //   },
  // });
}

/*@ signup controller creates a user and returns success:true message 
it validates the user information as well  
*/
export async function signup(req: Request, res: Response) {
  return customerAuth.signup(req, res, Client);
  // const { name, email, phoneNumber, password } = req.body;
  // //check if email is  available
  // const EmailExist = await User.findOne({ email });
  // if (EmailExist) {
  //   throw new BadAuthError("Email already exist", 400);
  // }

  // //check if phoneNumber is  already in use

  // const phoneNumberExist = await User.findOne({ phoneNumber });
  // if (phoneNumberExist) {
  //   throw new BadAuthError("phone number already exist", 400);
  // }

  // //create and save user
  // const user = new User({
  //   name,
  //   email,
  //   phoneNumber,
  //   password,
  //   lock: {
  //     tries: 0,
  //   },
  //   otpLock: {
  //     otpTries: 0,
  //   },
  // });

  // //generate otp
  // const otp = Math.floor(100000 + Math.random() * 900000);

  // user.otp = otp;

  // await user.save();
  // //send user otp
  // res.status(201).send({
  //   success: true,
  //   data: {
  //     otp,
  //     userId: user._id,
  //   },
  // });
}

//@ mobileLogin for users  with mobile apps ,create a refreshToken and accessToken
//sends both to user .
// export const mobileLogin =async (req:Request , res:Response) => {
//   const { email, password } = req.body;

//   //check if user exist
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new BadAuthError("Email or password is incorrect", 401);
//   }

//   //check if user account is locked

//   if (user.userLocked()) {
//     throw new BadAuthError(
//       "Account is locked. Try again " + moment().to(user.lock.expiresAt),
//       401
//     );
//   }

//   //compare password  , with user's hashpassword.. send error if password is incorrect

//   const isValid = await compare(password, user.password);

//   if (!isValid) {
//     user.lock.tries++;
//     if (user.lock.tries > parseInt(process.env.locked_tries!) + 1) {
//       user.lock.expiresAt = moment()
//         .add(process.env.lock_expiry_tries!, "minutes")
//         .toDate();
//     } else
//       user.lock.expiresAt = moment()
//         .add(process.env.lock_expiry!, "minutes")
//         .toDate();

//     await user.save();
//     throw new BadAuthError("Email or password is incorrect", 401);
//   }

//   user.lock.tries = 0;
//   user.lock.expiresAt = null;

//   //check if otp max has been reached and throw error

//   if (user.otpLocked()) {
//     await user.save();

//     throw new BadAuthError(
//       "otp limit reached. Try again " + moment().to(user.otpLock.expiresAt),
//       401
//     );
//   }

//   //generate otp
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   //set otp to user
//   user.otp = otp;

//   await user.save();
//   //creat two jwt one as a refreshToken  and one as an accessToken
//   //create a jwt for user
//   //  const accessToken = jwt.sign(
//   //    { id: user._id, email: user.email  },
//   //    process.env.JWT_SECRET!,
//   //    { expiresIn: "15m" }
//   //  );
//   //  const refreshToken = jwt.sign(
//   //    { id: user._id, email: user.email },
//   //    process.env.JWT_refresh!,
//   //    { expiresIn: "1hr" }
//   //  );
//   //if its from the web app set an http only cookie

//   //send the user , accessToken and refreshToken to the user
//   //  return res.status(200).send({
//   //    success: true,
//   //    data: {
//   //      user,
//   //      accessToken,
//   //      refreshToken
//   //    },
//   //  });

//   res.send({
//     success: true,
//     data: {
//       otp,
//       userId: user._id,
//     },
//   });

// }

//request for accessToken with the refresh token cookie
//return error if refresh token has expired
export const requestAccessToken = async (req: Request, res: Response) => {
  return customerAuth.requestAcceessToken(req, res, Client);
  // const { refreshToken } = req.signedCookies;

  // if (!refreshToken) {
  //   throw new BadAuthError("Authorization failed", 401);
  // }

  // try {
  //   const payload = jwt.verify(
  //     refreshToken,
  //     process.env.JWT_refresh!
  //   ) as Payload;

  //   const user = await User.findById(payload.id);

  //   if (!user) {
  //     throw new BadAuthError("Authorization failed", 401);
  //   }

  //   const newaccessToken = jwt.sign(
  //     { id: user._id, email: user.email },
  //     process.env.JWT_SECRET!,
  //     { expiresIn: "15m" }
  //   );

  //   res.status(200).send({
  //     success: true,
  //     data: {
  //       accessToken: newaccessToken,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw new BadAuthError("Authorization failed", 401);
  // }
};

//request for accessToken with the refresh token header
//return error if refresh token has expired
export const requestAccessTokenMobile = async (req: Request, res: Response) => {
  return customerAuth.requestMobileAccessToken(req, res, Client);
  // const refreshToken = req.headers["x-refresh-token"] as string;
  // console.log(req.headers["accept"]);
  // //check if header exist with the request;
  // console.log(refreshToken);
  // if (!refreshToken) {
  //   throw new BadAuthError("Authorization failed", 401);
  // }

  // //take the token from the string  : refreshToken =  "Bearer {$Token}"
  // const [_, token] = refreshToken.split(" ");

  // //extra check for token to improve security
  // if (!token) {
  //   throw new BadAuthError("Authorization failed", 401);
  // }
  // try {
  //   //verify token
  //   const payload = jwt.verify(token, process.env.JWT_refresh!) as Payload;

  //   const user = await User.findById(payload.id);

  //   if (!user) {
  //     throw new BadAuthError("Authorization failed", 401);
  //   }

  //   //create new user
  //   const newaccessToken = jwt.sign(
  //     { id: user._id, email: user.email },
  //     process.env.JWT_SECRET!,
  //     { expiresIn: "15m" }
  //   );

  //   res.status(200).send({
  //     success: true,
  //     data: {
  //       accessToken: newaccessToken,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw new BadAuthError("Authorization failed", 401);
  // }
};

/*
const mongoose = require('mongoose');

const RegistrationFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  age: {
    type: Number,
    required: true
  },
  employmentStatus: {
    type: String,
    required: true,
    enum: ['Employed', 'Unemployed', 'Self-employed']
  },
  employer: {
    type: String,
    default: null
  },
  occupation: {
    type: String,
    default: null
  },
  income: {
    type: Number,
    default: null
  }
});

// Set employer, occupation, and income fields to required if employment status is Employed or Self-employed
RegistrationFormSchema.path('employer').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Employer name is required for employed or self-employed applicants.');

RegistrationFormSchema.path('occupation').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Occupation is required for employed or self-employed applicants.');

RegistrationFormSchema.path('income').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Income is required for employed or self-employed applicants.');

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);


*/
export const  resetPassword=  async (req:Request ,res:Response)=>{

  
  return customerAuth.resetPassword(req , res, Client) ;

} 

export const forgotPassword =async(req:Request , res:Response)=>{

  return  customerAuth.forgotPassword(req ,res, Client) ; 
}

export const verifyforgotPasswordOtp = async (req: Request, res: Response) => {
  return customerAuth.verifyforgotPasswordOtp(req, res, Client);
};

export const changePassword = async (req: Request, res: Response) => {
  return customerAuth.changePassword(req, res, Client);
};

export const getAllClients = async(req:Request , res:Response)=>{
        const filter: { key?: object } = {};
        const limit = 10
            const page = req.query["page"]
              ? parseInt(req.query["page"].toString())
              : 1;
          
         
 
          if(req.query["name"] && !req.query["phoneNumber"]){
          
            filter["key"]= {name:{$regex:new RegExp(req.query["name"].toString())}}

          }
          else if(req.query["phoneNumber"] && !req.query["name"] ){

            filter["key"] = { phoneNumber: req.query["phoneNumber"] } ;
          }

          else{

            if(req.query["phoneNumber"] && req.query["name"]){
                  filter["key"] = {
                    $or: [
                      {
                        name: {
                          $regex: new RegExp(req.query["name"].toString()),
                        },
                      },
                      { phoneNumber: req.query["phoneNumber"] },
                    ],
                  };
              
            }
          }

          const count =  await Client.countDocuments() ;
      const users= await Client.find(filter["key"] || {}).skip((page-1) * limit).limit(limit) ;

      res.send({
        success:true ,data:{
          clients:users ,count
        }
      })
      
    
 

}

export const getClient = async (req: Request, res: Response) => {
  const user = await Client.findById(req.params.id);

   if(!user){
    throw  new  BadAuthError("client doesnt exist" ,404) ;
   }


   res.send({
    success:true , data:{
      client:user
    }

   })


};
