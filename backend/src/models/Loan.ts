import  mongoose, { Schema } from 'mongoose';
import  {ILoan , loanStatus} from './models.interface'


const loanSchema = new mongoose.Schema<ILoan>({
  principal: { type: Number, required: true, min: 0 },
  interestrate: { type: Number, required: true, min: 0 },
  charges: { type: Number, required: true, min: 0 },
  LoanTerm: { type: Date, required: true, defaul: null },
  loanStatus: {
    type: String,
    required: true,
    enum: Object.values(loanStatus),
    default: loanStatus.pending,
  },
  AmountPaid: { type: Number, required: true, default: 0.0 },
  AmountToBePaid: { type: Number, required: true },
  AmountRemained: { type: Number, required: true },
  client: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
  Guarantors: [
    { type: Schema.Types.ObjectId, required: true, ref: "Guarantor" },
  ],
  DateApproved: { type: Date, required: true, default: null },
  DateAccepted: { type: Date, required: true, default: null },
  DatePaid: { type: Date, required: true, default: null },
} , {

    timestamps:true , toJSON:{
        transform(doc, ret , option){

            ret.id = ret._id ;
            delete ret._id
        }
    }
});


loanSchema.pre("save" , function(next){

const self =  this ; 

 if(self.isModified("principal")){
     
    let rate =  (self.interestrate /100) * this.principal ; 
    console.log(rate) ; 

    const Amount =  (rate + self.charges)  + this.principal ; 
    this.set("AmountToBePaid" , Amount) ;  
    this.set("AmountRemained" ,Amount );

 }
 

 next()


})





export const Loan =  mongoose.model("Loan" ,loanSchema);
