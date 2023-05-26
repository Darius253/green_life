import request from 'supertest' ;
import {app} from '../../app' ; 
import {Loan} from '../../models/Loan' ; 
import { returnJwt } from '../../../test/setupFile';
import { Client } from '../../models/Client';
import { policyRepo } from '../../redisClient';
import  {hubtelService} from '../../services/huntelService' ;
import { createReadStream  ,readFileSync} from 'fs';
import path from 'path' ;

const picpath =  path.resolve(__dirname , "./Screenshot.png")
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
     
     
         let policy = await  policyRepo.createEntity() ; 
     
      
      
      policy.interestRate =  1.2 ; 
      policy.noRegisterationAmountCap=  200 ;
      policy.personalloanAmountCap= 500 ;
      policy.personalloanterm =   2 ;
      policy.noGurantorAmountCap =   2;
     
     
      let id=  await policyRepo.save(policy) ; 
     
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
  .expect(500) ;
})
  })