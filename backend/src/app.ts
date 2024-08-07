import express from "express";
import "express-async-errors";
import logger from 'morgan';
import  {clientRouter} from './routes/clientRoutes';
// import  {UserRouter} from '@routes/UserRoutes';
import "dotenv/config"
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { userRouter } from "@routes/userRoutes";
// import { registrationRouter } from "./routes/registrationRoutes";
const app = express();

app.use(express.json())
if(process.env.NODE_ENV === "test"){
     
   app.use(logger("dev")) ;
}

app.use(cookieParser("121121212"))


app.use(clientRouter);
app.use(userRouter)
// app.use(registrationRouter) ; 

app.use(errorHandler);
export { app };
