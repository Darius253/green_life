
import { IloanInstallment } from '../models/models.interface';
import Decimal from 'decimal.js'

export function sanitizeName(name:string){
 

    const val =  name.split(" ").map((v)=>{

         const firstChar= v.charAt(0).toUpperCase() ; 
        
        return firstChar + v.slice(1) ; 

    }).join(" ");


    return val



}

export function sanitizeNumber(phoneNumber:string){


    return phoneNumber ? "+233" +  phoneNumber.slice(1):phoneNumber;

}


export const retQuery = (query:any ,filter:any)=>{

    console.log(query)
for (let keys in query) {
  if (query["loanType"] && keys === "loanType") {
    filter[keys] = query[keys]?.toString();
  } else if (keys === "max_principal" && query["max_principal"]) {
    if (!filter["principal"]) {
      filter["principal"] = { $lt: parseInt(query[keys])};
    } else {
      filter["principal"]["$lt"] = parseInt(query[keys]);
    }
  } else {
    if (query["min_principal"] && keys === "min_principal") {
      if (!filter["principal"]) {
        filter["principal"] = { $gt: parseInt(query[keys]) };
      } else {
        filter["principal"]["$gt"] = parseInt(query[keys]);
      }
    }
  }
}
}

export const retLimit = (query:any)=>{


    return query ? parseInt(query) : 10;

}



export function calculateMonthlyInstallment(principal:number, interestRate:number, loanTerm:number) {
  // Convert interest rate to monthly rate
  const monthlyRate = new Decimal(interestRate).dividedBy(100).dividedBy(12);

  // Calculate monthly installment using the formula
  const numerator = new Decimal(principal).times(monthlyRate);
  const denominator = new Decimal(1).minus(
    new Decimal(1).dividedBy(new Decimal(1).plus(monthlyRate).pow(loanTerm))
  );
  const monthlyInstallment = numerator.dividedBy(denominator);

  // Round monthly installment to two decimal places
  const roundedInstallment = monthlyInstallment.toDecimalPlaces(2);

  return {
    monthlyInstallment: roundedInstallment, 
    monthlyRate
  };
}



export function caclPerform(amount:number , balance:number , performance:number){ 




if(performance){

let  x  =new Decimal(amount)
    .dividedBy(balance)
    .times(100)
    .toDecimalPlaces(2)
    .toNumber();

return  new Decimal(x+performance).dividedBy(2).toDecimalPlaces(2).toNumber()
}
 

return  new Decimal(amount).dividedBy(balance).times(100).toDecimalPlaces(2).toNumber()

}

export function calcLoanperfomance(arr:IloanInstallment[]){
 


  const x =  arr.reduce((curr , val)=>{
          
    return  curr+= val.performance! ;
  } , 0)

 
  return new Decimal(x).dividedBy(arr.length).toDecimalPlaces(2).toNumber() ;
}