import mongoose, { Schema , Types  ,Model} from "mongoose";
import { ILoan, loanStatus, LOANTYPE  ,IloanInstallment , loanInstallmentStatus} from "./models.interface";






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
    monthlyinterestRate:{type:Number , required:true ,min:0},
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
    monthlyPayment:{type:Number , required:true },
    
    repaymentAmount: { type: Number, required: true ,default:0.0 },
    remainingBalance: { type: Number, required: true , default:0.0 },
    client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
   
    DateApproved: { type: Date  },
    DateAccepted: { type: Date},
    DatePaid: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, option) {
        ret.id = ret._id;
        ret.principal =  ret.principal.toFixed(2)
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
      
      let monthlyinterestRate =  this.interestrate / 12 ; 
       let monthlyPayment = this.principal * 
         (monthlyinterestRate * (1 + monthlyinterestRate) ** this.loanterm) / ((1 + monthlyinterestRate) ** this.loanterm - 1);
     
      let repaymentAmount = monthlyPayment *  this.loanterm ; 

      this.set("monthlyinterestRate" , monthlyinterestRate) ; 
      this.set("monthlyPayment" , monthlyPayment) ; 
      this.set("repaymentAmount" , repaymentAmount) ; 
      this.set("remainingBalance" , repaymentAmount);

    }

    next()

})

export const Loan = mongoose.model("Loan", loanSchema);
