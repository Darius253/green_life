import { BadAuthError } from "@utils/BadAuthError";
import mongoose from "mongoose";
import { Ipolicy } from "./models.interface";


const aprSchema = new mongoose.Schema<Ipolicy>({

    noGurantorAmountCap:{type:Number ,required:true , min:0} , 
    noRegisterationAmountCap:{type:Number ,required:true , min:0} ,
    interestRate:{type:Number , required:true ,min:0} ,
    personalloanAmountCap:{type:Number , required:true ,min:0} , 
    personalloanterm:{type:Number , required:true ,min:0} 
} , {
    timestamps:true , toJSON:{
        transform(doc, ret, options) {
            ret.id =ret._id ; 

            delete ret.id ; 
        },
    }
});



export const Policy = mongoose.model<Ipolicy>("Policy", aprSchema);
