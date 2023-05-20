import express , {NextFunction, Request , Response}from "express";
import "express-async-errors";
import logger from 'morgan';
import  {clientRouter} from './routes/clientRoutes';
// import  {UserRouter} from '@routes/UserRoutes';
import "dotenv/config"
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes";
import { hubtelRoute } from "@routes/hubtel";
import { query } from "express-validator";
import { policyRouter } from "./routes/aprRoutes";
import { loanRouter } from "./routes/loanRoutes";
import  {connectRedis} from './redisClient'
import { createClient } from "redis";
import { User } from "@models/User";
import { Loan } from "@models/Loan";

// import { registrationRouter } from "./routes/registrationRoutes";

connectRedis()
const app = express();

app.use(express.static("./public"));
app.use(express.json())
if(process.env.NODE_ENV === "test"){
     
   app.use(logger("dev")) ;
}

app.use(cookieParser("121121212"))


app.use(clientRouter);
app.use(userRouter);
// app.use("/hubtel" , hubtelRoute)
app.use(policyRouter)
app.use("/api/loan" ,loanRouter)

// app.use(registrationRouter) ; 

app.use(errorHandler);



//       import { createClient } from 'redis';

// const client = createClient({
//     password: 'H4hQHon6Q8rU6MupDOE84bsw1CYG74jT',
//     socket: {
//         host: 'redis-11884.c52.us-east-1-4.ec2.cloud.redislabs.com',
//         port: 11884
//     }
// });


export { app};
