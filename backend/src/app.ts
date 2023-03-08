import express from "express";
import "express-async-errors";
import logger from 'morgan';
import  {UserRouter} from '@routes/UserRoutes';
import "dotenv/config"
import { errorHandler } from "middlewares/errorHandler";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json())
if(process.env.NODE_ENV === "test"){
     
   app.use(logger("dev")) ;
}

app.use(cookieParser("121121212"))


app.use(UserRouter);

app.use(errorHandler);
export { app };
