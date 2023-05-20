import { BadAuthError } from "../utils/BadAuthError";
import mongoose from "mongoose";
import  * as redis from 'redis-om' ; 

import { Ipolicy } from "./models.interface";

import { Repository } from "redis-om";

export class Policy extends redis.Entity {
  interestRate?: number;
  noRegisterationAmountCap?: number;
  noGurantorAmountCap?: number;
  personalloanAmountCap?: number;
  personalloanterm?: number;
}



export const policySchema = new redis.Schema(Policy, {
  interestRate: { type: "number" },
  noRegisterationAmountCap: { type: "number" },
  noGurantorAmountCap: { type: "number" },
  personalloanAmountCap: { type: "number" },
  personalloanterm:{type:"number"}
});

// const aprSchema = new mongoose.Schema<Ipolicy>({

//     noGurantorAmountCap:{type:Number ,required:true , min:0} , 
//     noRegisterationAmountCap:{type:Number ,required:true , min:0} ,
//     interestRate:{type:Number , required:true ,min:0} ,
//     personalloanAmountCap:{type:Number , required:true ,min:0} , 
//     personalloanterm:{type:Number , required:true ,min:0} 
// } , {
//     timestamps:true , toJSON:{
//         transform(doc, ret, options) {
//             ret.id =ret._id ; 

//             delete ret._id ; 
//         },
//     }
// });
//@ts-ignore



// export const Policy = mongoose.model<Ipolicy>("Policy", aprSchema);
