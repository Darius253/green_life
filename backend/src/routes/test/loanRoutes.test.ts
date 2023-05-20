import request from 'supertest' ;
import {app} from '../../app' ; 
import {Loan} from '../../models/Loan' ; 
import { returnJwt } from '../../../test/setupFile';
import { Client } from '../../models/Client';
import { policyRepo } from '../../redisClient';
let user:any ;

beforeAll(async()=>{

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
  describe('loan route' , ()=>{


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
})
  })