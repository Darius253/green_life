import { nextTick } from 'process';
import {Auth} from '../Auth'; 
 import jwt from 'jsonwebtoken';
function  thrtow(){
    throw new Error();
}
import 'dotenv/config'
import exp from 'constants';
describe("testing the auth" ,()=>{


 
    test("expect next fn to be called" , ()=>{

   let  token =  jwt.sign({id:"kelvin"},  process.env.JWT_SECRET! , {expiresIn:"1m"} )
         
        const req = {
                headers:{
                  "authorization":"Bearer "+token
                }
        }

        const res = {

        } 

        const NextFunction =  jest.fn()

        
      
        Auth(req ,res,NextFunction) ;

        expect(NextFunction).toBeCalled()


    })

 ,

 test("expect to return error when authorization header doesnt exist",  ()=>{
    






 const req = {
   headers: {
 
   },
 };

 const res = {};

 const NextFunction = jest.fn();

 

 expect(()=>Auth(req, res, NextFunction)).toThrow()



 }) ,


 test("expect to return an error if token is not passed" , ()=>{

    //    let token = jwt.sign({ id: "kelvin" }, process.env.JWT_SECRET!, {
    //      expiresIn: "1m",
    //    });

       const req = {
         headers: {
           authorization: "Bearer"
         },
       };

       const res = {};

       const NextFunction = jest.fn();

       expect(() => Auth(req, res, NextFunction)).toThrow(); 


 }) , 


 test("expect to throw an error if token has expired" , ()=>{
      let token = jwt.sign({ id: "kelvin" }, process.env.JWT_SECRET!, {
        expiresIn: "1ms",
      });

   const req = {
     headers: {
       authorization: "Bearer "+token,
     },
   };

   const res = {};

   const NextFunction = jest.fn();

   expect(() => Auth(req, res, NextFunction)).toThrow();
 })
})