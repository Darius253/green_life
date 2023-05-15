import winston, { transports , format } from "winston";
 const {prettyPrint} = format ;

// const myformat = printf(({ level, message }) => {
//   return { `${level}: ${JSON.stringify(message)}`}
// });
const logger = winston.createLogger({
level:'info' ,

format: prettyPrint() ,
transports:[
    new transports.Console() 

]


})


export  {logger}