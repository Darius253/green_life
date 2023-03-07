import express from "express";
import "express-async-errors";
import logger from 'morgan';
import  {UserRouter} from '@routes/UserRoutes';
const app = express();


if(process.env.NODE_ENV === "test"){
     
   app.use(logger("dev")) ;
}



export { app };
