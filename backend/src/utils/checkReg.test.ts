// import { check } from 'express-validator';
// import { checkReg, checkguarantors } from './checkReg';
// import { Request } from 'express';
import  {checkexec} from './checkReg'

// describe("testing if req body comes with guarantors", () => {



//     test("should throw an error if no name is included", async () => {

//         let req = {
//             body: {
//                 "guarantor1fullname": "",
//                 "guarantor1phoneNumber": "",
//                 "guarantor2fullname": "",
//                 "guarantor2phoneNumber": ""
//             }

//         };




//         await expect(() => checkguarantors(req)).rejects.toThrow();



//     }),

//         test("should reject if phoneNumber is not passed", async () => {

//             let req = {
//                 body: {
//                     "guarantor1fullname": "Kelvin Baiden",
//                     "guarantor1phoneNumber": "",
//                     "guarantor2fullname": "Kelvin Baiden",
//                     "guarantor2phoneNumber": ""
//                 }

//             };




//             await expect(() => checkguarantors(req)).rejects.toThrow();
//         }),

//         test("should reject if wrong phonenumber is not passed", async () => {

//             let req = {
//                 body: {
//                     "guarantor1fullname": "Kelvin Baiden",
//                     "guarantor1phoneNumber": "0207069806",
//                     "guarantor2fullname": "Kelvin Baiden",
//                     "guarantor2phoneNumber": "0207069806"
//                 }

//             };



//             const data =  await checkguarantors(req) ; 

//              expect(data).toBe(false);
//         }), 
        
//         test("should reject if there fullname has more than 100 characters", async () => {

//             let req = {
//                 body: {
//                     "guarantor1fullname": `pokopwepodkpowernnknkenwoinkonoknkoerfnokasdnoknreoinoksndioernojknjnverinjncvfurnkjnainrjnjxnainoknovduernjnusnerjqnviaunerainvajrjtnfvjnioernkdore
//                     lmknreoinonadsionoknoarnoiankonxmvjkvnjfviun kcnviornvkdnviernvkjnivnjnvdfnviernvjdnvuiernvuernivejuvnkujfnverjenjnuvernjedvuvnreindsjvftiuerndscjsvrnkodsvnkanrkojcxnodfanklvnfjtnkrjndjieruenkjfdntrejkdsvegugibndklvgrnjvkjgrnfrgrennererfporeopkforejfooproovromvomromvrmoimvfmomvoi
//                     crlkkrmvkmomlmfpmpomsddmrommfodlmfporpmrmreomro`,
//                     "guarantor1phoneNumber": "+233207069806",
//                     "guarantor2fullname": "kelvin Ato Baiden",
//                     "guarantor2phoneNumber": "+233207069806"
//                 }

//             };




//             await expect(() => checkguarantors(req)).rejects.toThrow();
//         })

//         ,
//         test("should return null phonenumber is  passed", async () => {

//             let req = {
//                 body: {
//                     "guarantor1fullname": "Kelvin Baiden",
//                     "guarantor1phoneNumber": "+233207069806",
//                     "guarantor2fullname": "Kelvin Baiden",
//                     "guarantor2phoneNumber": "+233207069806"
//                 }

//             };


// const data= await checkguarantors(req) 

//              expect(data).toBe(false);
//         })
        
//       ,test("should reject if types not passed 1" ,async ()=>{
//           let req = {
//             body:{
//                 "fullname":"lelvin baiden" ,
//                 "age":-1 ,
//                 "gender":"Male" , 
//                 "maritalStatus":"cadsdds",
//                 "educationLevel":"JSS" ,
//                 "residentialStatus":"ewewwe",
//                 "residentialAddress":"Ewecpojcojweoojjoejjor",
//                 "NoYearsAtResidence":12 ,
//                 "employmentStatus": "Emploired" , 
//                 "NoOfDependants":12 ,
//                 "CurrentlyServingaLoan":"WQ"
//             }
//           }

        
//           await expect(()=>checkReg(req)).rejects.toThrow()
//       })

 
//  ,test("should reject if types not passed 2" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Unemployed" , 
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO"
//       }
//     }

//   const data=  await checkReg(req)
//     expect(data).toBeUndefined()
// }) ,


// test("should reject if employmentstatus is unemployed and currentServ is no but data was passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Unemployed" , 
//           "Occupation":"roofrkop",
//           "Income":12 ,
//           "Savings":12 ,
//           "Surplus":111 ,
//          "Employer":"efwefrfer" ,
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO",
//           "SourceOfLoan":"rfrr" ,
//           "loanAmount":2112,
//           "loanApproved":'YES',
//           "defaulted": "Yes",
//           "NoMonthsDefaulted":12
          
//       }
//     }

  
//   await  expect(()=>checkReg(req)).rejects.toThrow()
// })
//  ,
//  test("should reject if types not passed 3" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Employed" , 
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO"
//       }
//     }

//     await expect(()=>checkReg(req)).rejects.toThrow()
// }) ,
// test("should reject if  employment status is self employed and types are not passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Self employed" , 
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO"
//       }
//     }

//     await expect(()=>checkReg(req)).rejects.toThrow()
// }) ,
// test("should return undefined if  employment is unemployed and currentserv is no" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Unemployed" , 
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO"
//       }
//     }
// const data =  await checkReg(req) ;
//     // awai0t expect(()=>checkReg(req)).rejects.toThrow()
//     expect(data).toBeUndefined()
// })  ,

// test("should return if all the correct data is passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Employed" , 
//           "Occupation":"roofrkop",
//           "Income":12 ,
//           "Savings":12 ,
//           "Surplus":"Save" ,
//          "Employer":"efwefrfer" ,
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"YES",
//           "SourceOfLoan":"Bank" ,
//           "loanAmount":2112,
//           "loanApproved":'YES',
//           "defaulted": "YES",
//           "NoMonthsDefaulted":12
          
//       }
//     }
 
//     const data= await checkReg(req); 
//  expect(data).toBeUndefined()
// }) ,
// test("should return if all the correct data is passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":10 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":12 ,
//           "employmentStatus": "Employed" , 
//           "Occupation":"roofrkop",
//           "Income":12 ,
//           "Savings":12 ,
//           "Surplus":"Save" ,
//          "Employer":"efwefrfer" ,
//           "NoOfDependants":12 ,
//           "CurrentlyServingaLoan":"NO",
          
          
//       }
//     }
 
//     const data= await checkReg(req); 
//  expect(data).toBeUndefined()
// }) ,

// test("should return if all the correct data is passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":-2 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":-12 ,
//           "employmentStatus": "Employed" , 
//           "Occupation":"roofrkop",
//           "Income":-12 ,
//           "Savings":-12 ,
//           "Surplus":"Save" ,
//          "Employer":"efwefrfer" ,
//           "NoOfDependants":-12 ,
//           "CurrentlyServingaLoan":"YES",
//           "SourceOfLoan":"Bank" ,
//           "loanAmount":-2112,
//           "loanApproved":'YES',
//           "defaulted": "YES",
//           "NoMonthsDefaulted":-12
          
//       }
//     }
 
   
//  await expect(()=> checkReg(req)).rejects.toThrow()
// }) ,
// test("should return if all the correct data is passed" ,async ()=>{
//     let req = {
//       body:{
//           "fullname":"lelvin baiden" ,
//           "age":2 ,
//           "gender":"Male" , 
//           "maritalStatus":"Divorced",
//           "educationLevel":"JHS" ,
//           "residentialStatus":"Resident",
//           "residentialAddress":"Ewecpojcojweoojjoejjor",
//           "NoYearsAtResidence":-12 ,
//           "employmentStatus": "Self employed" , 
//           "Occupation":"roofrkop",
//           "Income":-12 ,
//           "Savings":-12 ,
//           "Surplus":"Save" ,
//          "Employer":"efwefrfer" ,
//           "NoOfDependants":-12 ,
//           "CurrentlyServingaLoan":"YES",
//           "SourceOfLoan":"Bank" ,
//           "loanAmount":-2112,
//           "loanApproved":'YES',
//           "defaulted": "YES",
//           "NoMonthsDefaulted":-12
          
//       }
//     }
 
   
//  await expect(()=> checkReg(req)).rejects.toThrow()
// })
// } ,

// ) 


// describe('should throw an error ' , function(){



//     test('should throw an error',  async()=>{


//       let   obj:any = {} ; 

//       for(let i =1 ;  i<=4 ; i++){
//          obj[`beneficialOwner${i}fullname`]= 'Kelvin Ato Baiden' ;
//          obj[`beneficialOwner${i}phoneNumber`]=`+23350706986`

//       }
//       for(let i =1 ;  i<=4 ; i++){
//         obj[`shareHolders${i}fullname`]= 'Kelvin Ato Baiden' ;
//         obj[`shareHolders${i}phoneNumber`]=`+23350706986`

//      }
//      for(let i =1 ;  i<=4 ; i++){
//         obj[`directors${i}fullname`]= 'Kel' ;
//         obj[`directors${i}phoneNumber`]=`+23350706986`

//      }


  
//       let  req = {
//       body:{  numberofBeneficialOwners:4 ,
//         numberofShareHolders:4 ,
//         numberofDirectors:4 ,
//        ...obj
    
    
//     }
//         }
    
    
//  await   expect(()=> checkexec(req)).rejects.toThrow()


//     }) ,
//     test('should throw an error',  async()=>{


       
  
    
//         let  req = {
//         body:{  numberofBeneficialOwners:4 ,
//           numberofShareHolders:4 ,
//           numberofDirectors:4 ,
//           beneficialOwner$1fullname:'Kelvin Ato Baiden',
//           beneficialOwner$1phoneNumber:'+233507069806'
      
//       }
//           }
      
      
//    await   expect(()=> checkexec(req)).rejects.toThrow()
  
  
//       }) ,
//       test('should return false',  async()=>{


//         let   obj:any = {} ; 
  
//         for(let i =1 ;  i<=4 ; i++){
//            obj[`beneficialOwner${i}fullname`]= 'Kelvin Ato Baiden' ;
//            obj[`beneficialOwner${i}phoneNumber`]=`+233507069806`
  
//         }
//         for(let i =1 ;  i<=4 ; i++){
//           obj[`shareHolders${i}fullname`]= 'Kelvin Ato Baiden' ;
//           obj[`shareHolders${i}phoneNumber`]=`+233507069806`
  
//        }
//        for(let i =1 ;  i<=4 ; i++){
//           obj[`directors${i}fullname`]= 'Kelvin Ato Baiden' ;
//           obj[`directors${i}phoneNumber`]=`+233507069806`
  
//        }
  
  
    
//         let  req = {
//         body:{  numberofBeneficialOwners:4 ,
//           numberofShareHolders:4 ,
//           numberofDirectors:4 ,
//          ...obj
      
      
//       }
//           }
      
      
//    await   expect(()=> checkexec(req)).resolves.toBeUndefined()
  
  
//       })
// })