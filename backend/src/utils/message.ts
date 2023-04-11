

 export function  returnMessage(loan:string , amount:string , type:string){
 


    return  `Your loan application with id ${loan}  and principal ${amount} has been ${type}`



 }

 export function returnAppMessage(loan: string, amount: string){

return `Your loan application with id ${loan} and principal ${amount} has been submitted successfully`
 }