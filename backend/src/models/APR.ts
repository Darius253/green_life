import { BadAuthError } from '@utils/BadAuthError';
import mongoose from 'mongoose'  ; 
import {IAPR , IAprMethods} from './models.interface' ; 


type AprModels = mongoose.Model<IAPR , {} , IAprMethods>; 
 


const aprSchema =  new mongoose.Schema<IAPR , AprModels , IAprMethods>({
 
     
    interestRate:{type:Number , required:true , min:0} , 
    charges:{type:Number , required:true , min:0} 


} ,  {
    timestamps:true ,
})




aprSchema.method("calcApr" , function(principal:number){

    try {
     if(principal <  0 ){
        throw new Error("principal cannot be negative") ;

     }

     let amount:number =  principal + (principal * (this.interestRate /100)*1)+  (principal * (this.charges /100))


return amount ; 
} catch (error) {
    throw error ;
}
})


export const APR =  mongoose.model<IAPR , AprModels>("APR" ,  aprSchema) ; 