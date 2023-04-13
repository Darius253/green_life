import mongoose, { Schema , Types  ,Model} from "mongoose";
import { ILoan, loanStatus, LOANTYPE  ,IloanInstallment , loanInstallmentStatus} from "./models.interface";
import { calculateMonthlyInstallment } from "../utils/Sanitize";






type loanDocprops =  {
  installment: Types.DocumentArray<IloanInstallment>
}

const installmentSchema = new Schema<IloanInstallment>({
     
  amount:{type:Number , required:true , min:0} , 
  dueDate:{type:Date , required:true} , 
  remainingBalance:{type:Number ,required:true} , 
  status:{type:String , required:true , enum:Object.values(loanInstallmentStatus)} , 
  latePayment:{type:Boolean , required:true },
  lastPaymentDate:{type:Date ,required:true}
})
type loanModel =  Model<ILoan , {} , loanDocprops >
const loanSchema = new mongoose.Schema<ILoan>(
  {
    principal: { type: Number, required: true, min: 0 },
    interestrate: { type: Number, required: true, min: 0 },
    monthlyinterestRate:{type:Number ,min:0},
    loanType: { type: String, required: true ,enum:Object.values(LOANTYPE)},
    lastRepaymentDate: { type: Date},
    loanterm: { type: Number, required: true },
    loanStatus: {
      type: String,
      required: true,
      enum: Object.values(loanStatus),
      default: loanStatus.PENDING,
    },
    installment:[installmentSchema] , 
    monthlyPayment:{type:Number },
    
    repaymentAmount: { type: Number, required: true ,default:0.0 },
    remainingBalance: { type: Number, required: true , default:0.0 },
    client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
   
    DateApproved: { type: Date  },
    clientAgent:{type:Schema.Types.ObjectId , ref:"User"} ,
    DateAccepted: { type: Date},
    DatePaid: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, option) {
        ret.id = ret._id;
        ret.principal =  parseFloat(ret.principal.toFixed(2))
        delete ret._id;
      },
    },
  }
);

// loanSchema.pre("save", function (next) {
//   const self = this;

//   if (self.isModified("principal")) {
//     const Amount: number =
//       self.principal +
//       self.principal * (self.interestrate / 100) * 1 +
//       self.principal * (self.charges / 100);
//     this.set("repaymentAmount", Amount);
//     this.set("AmountOwed", Amount);
//   }

//   next();
// });


loanSchema.pre("save" , function(next){
const self =  this ;

    if(self.isModified("principal") || self.isModified("interestrate") || self.isModified("loanterm")){
       
      const payment=  calculateMonthlyInstallment(this.principal , this.interestrate , this.loanterm);
      let monthlyinterestRate = payment.monthlyRate
       let monthlyPayment =  payment.monthlyInstallment
        
     
      let repaymentAmount = monthlyPayment.times(this.loanterm) ; 
      console.log(this.loanterm)
      console.log(monthlyinterestRate)
        console.log(monthlyPayment)
      this.set("monthlyinterestRate", monthlyinterestRate.toDecimalPlaces(5)); 
      this.set("monthlyPayment", monthlyPayment); 
      this.set("repaymentAmount",  repaymentAmount.toDecimalPlaces(2)); 
      this.set("remainingBalance",  repaymentAmount.toDecimalPlaces(2));

    }

    next()

})

export const Loan = mongoose.model("Loan", loanSchema);
