import { Request, Response } from "express";
import { Model } from "mongoose";
import { BadAuthError } from "../utils/BadAuthError";
// import { BadAuthError } from '@utils/BadAuthError';
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Payload } from "app.interface";
import moment from "moment";
import { Client } from "@models/Client";
import { Authclass, Iauth } from "@models/models.interface";
export class Auth<T extends Iauth> {
  constructor() {}

  async login(req: Request, res: Response, doc: Model<T, {}, Authclass>) {
    const { phoneNumber, password } = req.body;

    //check if user exist
    const user = await doc.findOne({ phoneNumber });

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
        email: user.phoneNumber,
      },
    });
  }

  async signup(req: Request, res: Response, doc: Model<T, {}, Authclass>) {
    const { name, email, phoneNumber, password } = req.body;
    //check if email is  available
    const EmailExist = await doc.findOne({ email });
    if (EmailExist) {
      throw new BadAuthError("Email already exist", 400);
    }

    //check if phoneNumber is  already in use

    const phoneNumberExist = await doc.findOne({ phoneNumber });
    if (phoneNumberExist) {
      throw new BadAuthError("phone number already exist", 400);
    }

    //create and save user
    const user = new doc({
      name,
      email,
      phoneNumber,
      password,
      lock: {
        tries: 0,
      },
      otpLock: {
        otpTries: 0,
      },
    });

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;

    await user.save();
    //send user otp
    return res.status(201).send({
      success: true,
      data: {
        otp,
        email: user.phoneNumber,
      },
    });
  }

  async verifyOtp(req: Request, res: Response, doc: Model<T, {}, Authclass>) {
    const { otp, phoneNumber} = req.body;

    const user = await doc.findOne({phoneNumber});

    //check if user exists;
    if (!user) {
      throw new BadAuthError("incorrect phoneNumber", 401);
    }

    //check if otp is correct
    if (user.otp !== otp) {
      throw new BadAuthError("Wrong otp", 401);
    }

    //set otptries  to zero

    user.otpLock.otpTries = 0;
    user.otpLock.expiresAt = null;
    user.otp = null;

    //if user is not verified verify user
    if (!user.verified) {
      user.verified = true;

      await user.save();
      return res.send({
        success: true,
        data: {
          message: "user verified",
        },
      });
    }

    await user.save();
    //if user is already verified just send user

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "" },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_refresh!,
      { expiresIn: "1hr" }
    );
    //if its from the web app set an http only cookie

    //create an http only cookie containing the refreshToken
    res.cookie("refreshToken", refreshToken, { httpOnly: true, signed: true });
    return res.send({
      success: true,
      data: {
        user,
        accessToken,
      },
    });
  }

  async verifyMobileOtp(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const { otp, phoneNumber } = req.body;

    const user = await doc.findOne({phoneNumber});

    //check if user exists;
    if (!user) {
      throw new BadAuthError("User not found", 400);
    }

    //check if otp is correct
    if (user.otp !== otp) {
      throw new BadAuthError("Wrong otp", 401);
    }

    //set otptries  to zero

    user.otpLock.otpTries = 0;
    user.otpLock.expiresAt = null;
    user.otp = null;

    //if user is not verified verify user
    if (!user.verified) {
      user.verified = true;

      await user.save();
      return res.send({
        success: true,
        data: {
          message: "user verified",
        },
      });
    }

    await user.save();
    //if user is already verified just send user

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_refresh!,
      { expiresIn: "1hr" }
    );
    //if its from the web app set an http only cookie

    //send the user , accessToken and refreshToken to the user
    return res.status(200).send({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  }

  async resendOtp(req: Request, res: Response, doc: Model<T, {}, Authclass>) {
    const {phoneNumber} = req.body;

    const user = await doc.findOne({phoneNumber});

    if (!user) {
      throw new BadAuthError("user not found ", 400);
    }

    user.otp = null;
    //check if max otp tries have been reached and throw an error ;
    if (user.otpLocked()) {
      await user.save();

      throw new BadAuthError(
        "otp limit reached. Try again in " +
          moment().to(user.otpLock.expiresAt),
        401
      );
    }
    //generate new otp  ;

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    user.otpLock.otpTries++;
    user.otpLock.expiresAt = moment()
      .add(process.env.otp_expiry, "minutes")
      .toDate();

    await user.save();

    return res.send({
      success: true,
      data: {
        otp,
        email:user.phoneNumber,
      },
    });
  }

  async requestAcceessToken(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const { refreshToken } = req.signedCookies;

    if (!refreshToken) {
      throw new BadAuthError("Authorization failed", 401);
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_refresh!
      ) as Payload;

      const user = await doc.findById(payload.id);

      if (!user) {
        throw new BadAuthError("Authorization failed", 401);
      }

      const newaccessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      return res.status(200).send({
        success: true,
        data: {
          accessToken: newaccessToken,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadAuthError("Authorization failed", 401);
    }
  }

  async requestMobileAccessToken(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const refreshToken = req.headers["x-refresh-token"] as string;
    // console.log(req.headers["accept"]);
    //check if header exist with the request;
    // console.log(refreshToken);
    if (!refreshToken) {
      throw new BadAuthError("Authorization failed", 401);
    }

    //take the token from the string  : refreshToken =  "Bearer {$Token}"
    const [_, token] = refreshToken.split(" ");

    //extra check for token to improve security
    if (!token) {
      throw new BadAuthError("Authorization failed", 401);
    }
    try {
      //verify token
      const payload = jwt.verify(token, process.env.JWT_refresh!) as Payload;

      const user = await doc.findById(payload.id);

      if (!user) {
        throw new BadAuthError("Authorization failed", 401);
      }

      //create new user
      const newaccessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      return res.status(200).send({
        success: true,
        data: {
          accessToken: newaccessToken,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadAuthError("Authorization failed", 401);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const { password, oldPassword } = req.body;

    const user = await doc.findById(req.user?.id);

    if (!user) {
      throw new BadAuthError("user not authorized", 401);
    }
    //check if user has account is locked. that it user has made too many wrong entries
    if (user.userLocked()) {
      throw new BadAuthError(
        "Account is locked.Try again " + moment().to(user.lock.expiresAt),
        401
      );
    }

    //compare password
    const isValid = await compare(oldPassword, user.password);

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

    //if is password is valid change user password

    user.password = password;
    user.lock.tries = 0;
    user.lock.expiresAt = null;
    await user.save();

    //find a way to delete user session from logged in devices ;

    res.send({
      success: true,
    });
  }

  async resetPhoneNumber(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {}

  async forgotPassword(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const { phoneNumber} = req.body;

    const user = await doc.findOne({  phoneNumber});

    if (!user) {
      throw new BadAuthError("user not found", 403);
    }

    //generate an otp to user

    const otp = Math.floor(1000000 + Math.random() * 9000000);

    user.otp = otp;

    await user.save();

    res.send({
      success: true,
      data: {
        otp,email:user.phoneNumber
      },
    });
  }

  async verifyforgotPasswordOtp(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
    const { phoneNumber, otp } = req.body;
    const user = await doc.findOne({ phoneNumber });

    if (!user) {
      throw new BadAuthError("user not found", 401);
    }

    if (user.otp !== otp) {
      throw new BadAuthError("incorrect otp", 401);
    }

    user.otp = null;
    await user.save();
    res.send({
      success: true, email:user.phoneNumber
    });
  }

  async changePassword(
    req: Request,
    res: Response,
    doc: Model<T, {}, Authclass>
  ) {
const {password ,phoneNumber} = req.body.password ; 
  
const user =  await doc.findOne({phoneNumber}) ; 

if(!user){
  throw new BadAuthError("incorrect phoneNumber" ,403) ; 
}

 
   user.password =    password ; 

   await user.save()  ; 
  

   res.send({
    success:true 
   })

    
  }
}
