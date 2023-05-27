import request from 'supertest' ;
import {app} from '../../app' ; 
import {Loan} from '../../models/Loan' ; 
import { returnJwt } from '../../../test/setupFile';
import { Client } from '../../models/Client';
import { policyRepo } from '../../redisClient';
import  {hubtelService} from '../../services/huntelService' ;
import { createReadStream  ,readFileSync} from 'fs';
import path from 'path' ;

const picpath =  path.resolve(__dirname , "Screenshot.png")
let user:any ;
 const buffer=  readFileSync(picpath)  ;

jest.mock("../../services/huntelService")

  describe('loan route' , ()=>{

    beforeAll(async()=>{
    //@ts-ignore
      hubtelService.mockImplementation(()=>{
        return {
          sendMessage:()=>{
            console.log('hell0')
          }  }
      })


      user =  await new  Client({
         name: 'kelvinc' ,
         email:'test@test.com',
         password:'1234.' ,
         phoneNumber:'+23350709805'
     
         }).save()
     
         let policy =  await policyRepo.search().returnFirst() ;

         await policyRepo.remove(policy?.entityId!)
         policy = await  policyRepo.createEntity() ; 
     
      
      
      policy.interestRate =  1.2 ; 
      policy.noRegisterationAmountCap=  200 ;
      policy.personalloanAmountCap= 500 ;
      policy.personalloanterm =   2 ;
      policy.noGurantorAmountCap =   1000;
     
     
      let id=  await policyRepo.save(policy) ; 
     
     })

     afterAll(async ()=>{
    
      let policy =  await policyRepo.search().returnFirst() ;

      await policyRepo.remove(policy?.entityId!)
     })
test('should return a  200 ' , async()=>{




   await  request(app).post('/api/loan/personalloan/request')
    
    .field('name', 'my awesome avatar')
    .expect(401) ; 
})

, 

test("should return a 422" , async()=>{
  
  
 await  request(app).post('/api/loan/personalloan/request')
 .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
 .field('name', 'my awesome avatar')
 .expect(422) ; 
}) ,


test("should return a 422 c" ,async () => {
  
 let user =  await new  Client({
  name: 'kelvinv' ,
  email:'test12@test.com',
  password:'1234.' ,
  phoneNumber:'+23350709802'

  }).save()

 await  request(app).post('/api/loan/personalloan/request')
 .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
 .field('principal', '21')
 .field('interestrate' , '.2') 
 .field('loanterm' , 1) 
 .expect(400) ; 
})  , 

test("should return a 400  if no registration and no images passed and amount is > noregistration amount cap" ,async () => {
  
  let user =  await new  Client({
   name: 'kelvinv' ,
   email:'test12@test.com',
   password:'1234.' ,
   phoneNumber:'+23350709802'
 
   }).save()
 
  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .field('principal', '100')
  .field('interestrate' , '.2') 
  .field('loanterm' , 1) 
  .expect(400) ; 
 }) , 




test("Should create a no registration amount cap  ,should return a 200" , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '21')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) ;
}) , 

test("Should create a no registration amount cap  ,should return a 200" , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '21')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) 
  
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()
})  , 

test("Should return a 422 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '600')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(422) 
  
}) ,
test("Should return a 422 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '1100')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  .field(  "fullname" ,"lelvin baiden")
  .field("age" ,10)  
  .field("gender" , "Male")
  .field("NoOfDependants" ,12 ) 
  .field( "CurrentlyServingaLoan" ,"YES") 
  .field( "SourceOfLoan" ,"Bank") 
  .field("loanAmount" ,2112) 
  .field( "loanApproved" ,'YES') 
  .field( "defaulted", "YES") 
  .field("NoMonthsDefaulted" ,12) 
  .field("Employer" ,"efwefrfer") 
  .field("Surplus" ,"Save") 
  .field(    "Savings" ,12) 
  .field( "Income" ,12 ) 
  .field(   "Occupation" ,"roofrkop") 
  .field( "employmentStatus" , "Employed" ) 
  .field( "NoYearsAtResidence" ,12 ) 
  .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  .field("residentialStatus" ,"Resident") 
  .field("educationLevel" ,"JHS") 
  .field("maritalStatus" ,"Divorced") 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(422) 
  
}) 
,
test("Should return a 200 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '600')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  .field(  "fullname" ,"lelvin baiden")
  .field("age" ,10)  
  .field("gender" , "Male")
  .field("NoOfDependants" ,12 ) 
  .field( "CurrentlyServingaLoan" ,"YES") 
  .field( "SourceOfLoan" ,"Bank") 
  .field("loanAmount" ,2112) 
  .field( "loanApproved" ,'YES') 
  .field( "defaulted", "YES") 
  .field("NoMonthsDefaulted" ,12) 
  .field("Employer" ,"efwefrfer") 
  .field("Surplus" ,"Save") 
  .field(    "Savings" ,12) 
  .field( "Income" ,12 ) 
  .field(   "Occupation" ,"roofrkop") 
  .field( "employmentStatus" , "Employed" ) 
  .field( "NoYearsAtResidence" ,12 ) 
  .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  .field("residentialStatus" ,"Resident") 
  .field("educationLevel" ,"JHS") 
  .field("maritalStatus" ,"Divorced") 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()
}) ,
test("Should return a 200 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802'
  
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '1100')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  .field(  "fullname" ,"lelvin baiden")
  .field("age" ,10)  
  .field("gender" , "Male")
  .field("NoOfDependants" ,12 ) 
  .field( "CurrentlyServingaLoan" ,"YES") 
  .field( "SourceOfLoan" ,"Bank") 
  .field("loanAmount" ,2112) 
  .field( "loanApproved" ,'YES') 
  .field( "defaulted", "YES") 
  .field("NoMonthsDefaulted" ,12) 
  .field("Employer" ,"efwefrfer") 
  .field("Surplus" ,"Save") 
  .field(    "Savings" ,12) 
  .field( "Income" ,12 ) 
  .field(   "Occupation" ,"roofrkop") 
  .field( "employmentStatus" , "Employed" ) 
  .field( "NoYearsAtResidence" ,12 ) 
  .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  .field("residentialStatus" ,"Resident") 
  .field("educationLevel" ,"JHS") 
  .field("maritalStatus" ,"Divorced") 
   .field("guarantor1fullname" , "Kelvin Baiden")
   .field("guarantor1phoneNumber" ,"+233207069806")
   .field("guarantor2fullname" , "Kelvin Baiden")
   .field("guarantor2phoneNumber" , "+233207069806")
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()
}) ,
test("Should create a no registration amount cap  ,should return a 200" , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802' ,
    registered:true
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '21')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 
  // console.log(res.body)
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()
})  ,
test("Should return a 200 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802' ,
  registered:true
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '600')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  // .field(  "fullname" ,"lelvin baiden")
  // .field("age" ,10)  
  // .field("gender" , "Male")
  // .field("NoOfDependants" ,12 ) 
  // .field( "CurrentlyServingaLoan" ,"YES") 
  // .field( "SourceOfLoan" ,"Bank") 
  // .field("loanAmount" ,2112) 
  // .field( "loanApproved" ,'YES') 
  // .field( "defaulted", "YES") 
  // .field("NoMonthsDefaulted" ,12) 
  // .field("Employer" ,"efwefrfer") 
  // .field("Surplus" ,"Save") 
  // .field(    "Savings" ,12) 
  // .field( "Income" ,12 ) 
  // .field(   "Occupation" ,"roofrkop") 
  // .field( "employmentStatus" , "Employed" ) 
  // .field( "NoYearsAtResidence" ,12 ) 
  // .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  // .field("residentialStatus" ,"Resident") 
  // .field("educationLevel" ,"JHS") 
  // .field("maritalStatus" ,"Divorced") 
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res.body.success).toBeTruthy() ;
  // console.log(res.body)
  expect(res.body.data.loanRequest).toBeDefined()
}) , 
test("Should return a 200 " , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802' ,
  registered:true
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '1100')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  // .field(  "fullname" ,"lelvin baiden")
  // .field("age" ,10)  
  // .field("gender" , "Male")
  // .field("NoOfDependants" ,12 ) 
  // .field( "CurrentlyServingaLoan" ,"YES") 
  // .field( "SourceOfLoan" ,"Bank") 
  // .field("loanAmount" ,2112) 
  // .field( "loanApproved" ,'YES') 
  // .field( "defaulted", "YES") 
  // .field("NoMonthsDefaulted" ,12) 
  // .field("Employer" ,"efwefrfer") 
  // .field("Surplus" ,"Save") 
  // .field(    "Savings" ,12) 
  // .field( "Income" ,12 ) 
  // .field(   "Occupation" ,"roofrkop") 
  // .field( "employmentStatus" , "Employed" ) 
  // .field( "NoYearsAtResidence" ,12 ) 
  // .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  // .field("residentialStatus" ,"Resident") 
  // .field("educationLevel" ,"JHS") 
  // .field("maritalStatus" ,"Divorced") 
   .field("guarantor1fullname" , "Kelvin Baiden")
   .field("guarantor1phoneNumber" ,"+233207069806")
   .field("guarantor2fullname" , "Kelvin Baiden")
   .field("guarantor2phoneNumber" , "+233207069806")
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()
})  ,
test("Should create a no registration amount cap  ,should return a 200" , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802' ,
   
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '21')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) 
  // console.log(res.body)
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()

  const res2 =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '600')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  .field(  "fullname" ,"lelvin baiden")
  .field("age" ,10)  
  .field("gender" , "Male")
  .field("NoOfDependants" ,12 ) 
  .field( "CurrentlyServingaLoan" ,"YES") 
  .field( "SourceOfLoan" ,"Bank") 
  .field("loanAmount" ,2112) 
  .field( "loanApproved" ,'YES') 
  .field( "defaulted", "YES") 
  .field("NoMonthsDefaulted" ,12) 
  .field("Employer" ,"efwefrfer") 
  .field("Surplus" ,"Save") 
  .field(    "Savings" ,12) 
  .field( "Income" ,12 ) 
  .field(   "Occupation" ,"roofrkop") 
  .field( "employmentStatus" , "Employed" ) 
  .field( "NoYearsAtResidence" ,12 ) 
  .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  .field("residentialStatus" ,"Resident") 
  .field("educationLevel" ,"JHS") 
  .field("maritalStatus" ,"Divorced") 
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res2.body.success).toBeTruthy() ;
  console.log(res2.body)
  expect(res2.body.data.loanRequest).toBeDefined()
}) ,

test("Should create a no registration amount cap  ,should return a 200" , async()=>{

  let user =  await new  Client({
    name: 'kelvinv' ,
    email:'test12@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709802' ,
   
    }).save()

    console.log(picpath)
  
 const res =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '21')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  .attach("face" , picpath) 
  .attach('ghanaCardBack'  ,picpath)
  .attach('ghanaCardFront' , picpath)
  .expect(200) 
  // console.log(res.body)
  expect(res.body.success).toBeTruthy() ;
  expect(res.body.data.loanRequest).toBeDefined()

  const res2 =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '600')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1')
  .field(  "fullname" ,"lelvin baiden")
  .field("age" ,10)  
  .field("gender" , "Male")
  .field("NoOfDependants" ,12 ) 
  .field( "CurrentlyServingaLoan" ,"YES") 
  .field( "SourceOfLoan" ,"Bank") 
  .field("loanAmount" ,2112) 
  .field( "loanApproved" ,'YES') 
  .field( "defaulted", "YES") 
  .field("NoMonthsDefaulted" ,12) 
  .field("Employer" ,"efwefrfer") 
  .field("Surplus" ,"Save") 
  .field(    "Savings" ,12) 
  .field( "Income" ,12 ) 
  .field(   "Occupation" ,"roofrkop") 
  .field( "employmentStatus" , "Employed" ) 
  .field( "NoYearsAtResidence" ,12 ) 
  .field("residentialAddress" ,"Ewecpojcojweoojjoejjor") 
  .field("residentialStatus" ,"Resident") 
  .field("educationLevel" ,"JHS") 
  .field("maritalStatus" ,"Divorced") 
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 
  expect(res2.body.success).toBeTruthy() ;
  console.log(res2.body)
  expect(res2.body.data.loanRequest).toBeDefined() 


  const res3 =  await  request(app).post('/api/loan/personalloan/request')
  .set("Authorization" , "Bearer "+returnJwt({id:user._id.toString()  , email:user.email }) )
  .set('Content-Type', 'multipart/form-data')
  .field('principal', '700')
  .field('interestrate' , '.2') 
  .field('loanterm' , '1') 
  // .attach("face" , picpath) 
  // .attach('ghanaCardBack'  ,picpath)
  // .attach('ghanaCardFront' , picpath)
  .expect(200) 

  expect(res3.body.success).toBeTruthy() ;
  console.log(res3.body)
  expect(res3.body.data.loanRequest).toBeDefined() 

})
  })