import express , {Request , Response}from "express";
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
// import { policyRouter } from "./routes/aprRoutes";
import { loanRouter } from "./routes/loanRoutes";
import { User } from "@models/User";
import { Loan } from "@models/Loan";

// import { registrationRouter } from "./routes/registrationRoutes";

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
// app.use(policyRouter)
app.use("/api/loan" ,loanRouter)

// app.use(registrationRouter) ; 

app.use(errorHandler);
export { app };
