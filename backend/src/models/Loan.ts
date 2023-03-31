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

    loanType: { type: String, required: true ,enum:Object.values(LOANTYPE)},
    lastPaymentDate: { type: Date, required: true, default: null },
    loanterm: { type: Number, required: true },
    loanStatus: {
      type: String,
      required: true,
      enum: Object.values(loanStatus),
      default: loanStatus.PENDING,
    },
    installment:[installmentSchema] , 
    AmountPaid: { type: Number, required: true, default: 0.0 },
    repaymentAmount: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    client: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
    Guarantors: [{ type: Schema.Types.ObjectId, ref: "Guarantor" }],
    DateApproved: { type: Date, required: true, default: null },
    DateAccepted: { type: Date, required: true, default: null },
    DatePaid: { type: Date, required: true, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, option) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

loanSchema.pre("save", function (next) {
  const self = this;

  if (self.isModified("principal")) {
    const Amount: number =
      self.principal +
      self.principal * (self.interestrate / 100) * 1 +
      self.principal * (self.charges / 100);
    this.set("repaymentAmount", Amount);
    this.set("AmountOwed", Amount);
  }

  next();
});

export const Loan = mongoose.model("Loan", loanSchema);
