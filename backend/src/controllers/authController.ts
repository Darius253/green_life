import {Request , Response} from 'express'; 
import {Model} from 'mongoose';
import { BadAuthError } from "../utils/BadAuthError";
// import { BadAuthError } from '@utils/BadAuthError';
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Payload } from "app.interface";
import moment from "moment";
import {User} from '@models/User'
  import {  Authclass , Iauth} from "@models/models.interface";
export class  Auth<T extends Iauth >{

    constructor(){

    }


    async login(req:Request , res:Response , doc:Model<T, {} , Authclass>){
 
const { email, password } = req.body;


//check if user exist
const user = await doc.findOne({ email });

if (!user) {
  throw new BadAuthError("Email or password is incorrect", 401);
}

//  console.log(user.userLocked());//compare password  , with user's hashpassword.. send error if password is incorrect

if (user.userLocked()) {
  throw new BadAuthError(
    "Account is locked.Try again " + moment().to(user.lock.expiresAt),
    401
  );
}

const isValid = await compare(password, user.password);

if (!isValid) {
  user.lock.tries++;

  if (user.lock.tries > parseInt(process.env.locked_tries!) + 1) {
    user.lock.expiresAt = moment()
      .add(process.env.lock_expiry_tries!, "minutes")
      .toDate();
  } else
    user.lock.expiresAt = moment()
      .add(process.env.lock_expiry!, "minutes")
      .toDate();

  await user.save();

  throw new BadAuthError("Email or password is incorrect", 401);
}

//creat two jwt one as a refreshToken  and one as an accessToken
//create a jwt for user
user.lock.tries = 0;
user.lock.expiresAt = null;
user.otp = null; 
//check if otp  max has been reached and throw error
if (user.otpLocked()) {
  await user.save();
  throw new BadAuthError(
    "otp limit reached. Try again " + moment().to(user.otpLock.expiresAt),
    401
  );
}

//generate otp
const otp = Math.floor(100000 + Math.random() * 900000);

//set otp to user
user.otp = otp;

await user.save();

//    const accessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"15m"}) ;
//  const refreshToken = jwt.sign({id:user._id , email:user.email} , process.env.JWT_refresh! , {expiresIn:"1hr"}) ;
//   //if its from the web app set an http only cookie

//             //create an http only cookie containing the refreshToken
//     res.cookie("refreshToken" , refreshToken , {httpOnly:true , signed:true}) ;
//       return res.status(200).send({
//        success: true,
//        data: {
//          user,
//          accessToken
//        }
//      });

//send otp to user for verification

return res.send({
  success: true,
  data: {
    otp,
    userId: user._id,
  },
});


  
        
    }

    async signup(req:Request , res:Response , doc:Model<T, {} , Authclass>){

    }

    async verifyOtp(req:Request , res:Response , doc:Model<T, {} , Authclass>){

    }

    async verifyMobileOtp(req:Request , res:Response , doc:Model<T, {} , Authclass>){

    }

    async resendOtp(req:Request , res:Response , doc:Model<T, {} , Authclass>){

    }
     
    async requestAcceessToken(req:Request , res:Response , doc:Model<T, {} , Authclass>){} 

    async requestMobileAccessToken(req:Request , res:Response , doc:Model<T, {} , Authclass>){} 


    async resetPassword(req:Request , res:Response , doc:Model<T, {} , Authclass>){}

    async resetPhoneNumber(req:Request , res:Response , doc:Model<T, {} , Authclass>){} 

    async forgotPassword(req:Request , res:Response , doc:Model<T, {} , Authclass>){}
}



