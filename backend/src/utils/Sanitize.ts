


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
for (let keys in query) {
  if (keys === "loantype") {
    filter[keys] = query[keys]?.toString();
  } else if (keys === "max_principal") {
    if (!filter["principal"]) {
      filter["principal"] = { $gt: query[keys] };
    } else {
      filter["principal"]["$gt"] = query[keys];
    }
  } else {
    if (keys === "min_principal") {
      if (!filter["principal"]) {
        filter["principal"] = { $lt: query[keys] };
      } else {
        filter["principal"]["$lt"] = query[keys];
      }
    }
  }
}
}

export const retLimit = (query:any)=>{


    return query["limit"] ? parseInt(query["limit"].toString()) : 10;

}