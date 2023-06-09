
import  {Schema , model} from 'mongoose';
import { Ipayment } from './models.interface';


const paymentSchema=   new  Schema<Ipayment>({


  
    loan :{ type:Schema.Types.ObjectId  , required:true , ref:'Loan'} , 
    paymentType:{type:String , required:true} , 
     amount:{type:Number , required:true} ,

 
     
} , {

timestamps:true ,
toJSON:{


    transform(doc, ret, options) {
        ret.id =ret._id ;
        delete ret._id
    },
}

})




export const Payment  = model('Payment' , paymentSchema) ;




