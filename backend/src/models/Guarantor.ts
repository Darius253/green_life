import {model , Schema} from 'mongoose';
import { guarantorRole, Iguarantor } from './models.interface';


const guarantorSchema= new  Schema<Iguarantor>({


FullName:{type:String , required:true } , 
phoneNumber:{type:String , required:true}  , 
Address:{type:String  } , 
role: {type:String, enum:Object.values(guarantorRole)} ,
Loan:{type:Schema.Types.ObjectId , required:true , ref:"Loan"}


})




export const Guarantor = model("Guarantor" , guarantorSchema) ; 