import {model , Schema} from 'mongoose';
import { Iguarantor } from './models.interface';


const guarantorSchema= new  Schema<Iguarantor>({


FullName:{type:String , required:true } , 
phoneNumber:{type:String , required:true}  , 
Address:{type:String  } , 



})




export const Guarantor = model("Guarantor" , guarantorSchema) ; 