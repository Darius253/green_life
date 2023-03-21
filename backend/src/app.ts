import express from "express";
import "express-async-errors";
import logger from 'morgan';
import  {UserRouter} from './routes/UserRoutes';
// import  {UserRouter} from '@routes/UserRoutes';
import "dotenv/config"
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
import { registrationRouter } from "@routes/registrationRoutes";
import {aprRouter} from '@routes/aprRoutes'
=======
// import { registrationRouter } from "./routes/registrationRoutes";
>>>>>>> d5bb21f4e05748c8e56ee8fe0c8760baf535a6b4
const app = express();

app.use(express.json())
if(process.env.NODE_ENV === "test"){
     
   app.use(logger("dev")) ;
}

app.use(cookieParser("121121212"))


app.use(UserRouter);
<<<<<<< HEAD
app.use(registrationRouter) ; 
app.use(aprRouter) ; 
=======
// app.use(registrationRouter) ; 
>>>>>>> d5bb21f4e05748c8e56ee8fe0c8760baf535a6b4

app.use(errorHandler);
export { app };
