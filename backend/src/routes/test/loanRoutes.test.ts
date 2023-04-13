import request from 'supertest' ;
import {app} from '../../app' ; 
import {Loan} from '../../models/Loan' ; 
import { returnJwt } from '../../../test/setupFile';
import { Client } from '@models/Client';



  describe('loan route' , ()=>{


test('should return a  200 ' , async()=>{


    const user =  await new  Client({
    name: 'kelvinc' ,
    email:'test@test.com',
    password:'1234.' ,
    phoneNumber:'+23350709805'

    }).save()

    request(app).post('/personalloan/request')
    .set({
         
        'Authorization' : returnJwt({id:user._id.toString() ,email:user.email  })

    })
    .send({
     principal:30 ,
     interestrate:2 ,
     loanterm:3,
    })
    .expect(200) ; 
})

  })