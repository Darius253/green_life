import {model , Schema} from 'mongoose';
import { Iguarantor } from './models.interface';


const guarantorSchema= new  Schema<Iguarantor>({


FullName:{type:String , required:true } , 
phoneNumber:{type:String , required:true}  , 
Address:{type:String  , required:true} , 
Loan:{type:Schema.Types.ObjectId , required:true , ref:"Loan"} ,


})




export const Guarantor = model("Guarantor" , guarantorSchema) ; 