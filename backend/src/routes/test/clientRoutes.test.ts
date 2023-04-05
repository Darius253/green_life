// import request from "supertest";
// import {app} from '../../app' ; 
// import { Client } from "../../models/Client";


// beforeEach(async()=>{

//     const user =  await new Client({
//        name:'krejrekjre' , 
//        phoneNumber:'+233507069804',
//        email:'eeerrfrftrrtgt' ,
//        password:'rjRFRrrrere'
//     })
// .save()
// })

// describe("writing test  for the client routes" , ()=>{

 
//     test("should return a 200" , async()=>{
     
//       await  request(app).post("/api/auth/signup")
//         .send({
//             'name':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
//             'confirmpassword':'UniquePassword.1'
//         })
//         .expect(201)
         
//     }) ,


//     test("should return a 422" , async()=>{

//        await request(app).post("/api/auth/signup")
//         .send({
//             'name':'kelvin Ato',
//             'email':'testtest.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
//             'confirmpassword':'UniquePassword'
//         })
//         .expect(422)

//     })
//  , 
//  test('should return a 200' , async ()=>{
     
//     const signup =      await  request(app).post("/api/auth/signup")
//     .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201) 

//     expect(signup.body.data.otp).toBeDefined()

//     await request(app).post('/api/auth/login')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(200)
//  }) ,
//  test('should return a 200' , async ()=>{
     
//     const signup =      await  request(app).post("/api/auth/signup")
//     .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201) 

//     expect(signup.body.data.otp).toBeDefined()

//     await request(app).post('/api/auth/login')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(200)

//     expect(signup.body.data.otp).toBeDefined()
//  }) , 

//   test('should return a 401' ,async ()=>{


    
//     await request(app).post('/api/auth/login')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(401)
//   }) , 

//   test('should return a 422' ,  async()=>{

//     await request(app).post('/api/auth/login')
//     .send({
//         'phoneNumber':'507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(422)

//   }) ,

//   test('should return a 401' , async()=>{

//     await request(app).post('/api/auth/verifymobileotp')
//     .send({
//         'otp':'232111' , 
//         'phoneNumber':'0207698017'
//     })
//     .expect(401)
//   })  , 

//   test('should return a ' , async()=>{

//     await request(app).post('/api/auth/verifyOtp')
//     .send({
//         'otp':'232111' , 
//         'phoneNumber':'0207698017'
//     })
//     .expect(401)
//   }) ,
//   test('should return a ' , async()=>{

//     await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201) 

// const res =     await request(app).post('/api/auth/login')
// .send({
//     'phoneNumber':'+233507069807' ,
//     'password':'UniquePassword.1'
// }).expect(200)

//    const res2=  await request(app).post('/api/auth/verifyOtp')
//     .send({
//         'otp':res.body.data.otp , 
//         'phoneNumber':res.body.data.phoneNumber
//     })
//     .expect(200)


//     expect(res2.headers['set-cookie']).toBeDefined()
//   }),

// test('should return a 200' , async()=>{
//     await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201) 

// const res =     await request(app).post('/api/auth/login')
// .send({
//     'phoneNumber':'+233507069807' ,
//     'password':'UniquePassword.1'
// }).expect(200)


// const otpres = await request(app).post('/api/auth/resendOtp')
// .send({
//     'phoneNumber':res.body.data.phoneNumber 
// }).expect(200) ; 

// expect( otpres.body.data.otp).toBeDefined() ;
// }) ,
// test('should return a 200' , async()=>{
//     await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201) 

// const res =     await request(app).post('/api/auth/login')
// .send({
//     'phoneNumber':'+233507069807' ,
//     'password':'UniquePassword.1'
// }).expect(200)

// await request(app).post('/api/auth/resendOtp')
// .send({
//     'phoneNumber':res.body.data.phoneNumber 
// }).expect(200)
// }) 
// ,

// test('should return a 401', async()=>{
//   const res=  await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201)
    
    
//     const res2=  await request(app)
//     .post('/api/auth/verifyOtp')
//     .send({
//         'otp':res.body.data.otp , 
//         'phoneNumber':res.body.data.phoneNumber
//     }).expect(200)





//     await request(app)
    
//     .post('/api/client/resetPassword')
//     .set('authorization' , 'Bearer '+res2.body.data.accessToken)
//     .send({
//         'password':'UniqewuePassword.1' , 
//         'oldPassword':'UniquePassword.1'
//     })
//     .expect(200)


// }) ,
// test('should return a 401', async()=>{
//     const res=  await request(app).post('/api/auth/signup') .send({
//           'name':'kelvin Ato',
//           'email':'test@test.com' ,
//           'phoneNumber':'+233507069807' ,
//           'password':'UniquePassword.1' ,
//           'confirmpassword':'UniquePassword.1'
//       })
//       .expect(201)
      
      
//       const res2=  await request(app)
//       .post('/api/auth/verifyOtp')
//       .send({
//           'otp':res.body.data.otp , 
//           'phoneNumber':res.body.data.phoneNumber
//       }).expect(200)
  
  
  
  
  
//       await request(app)
      
//       .post('/api/client/resetPassword')
//       .set('authorization' , 'Bearer '+res2.body.data.accessToken)
//       .send({
//           'password':'UniquePassword.1' , 
//           'oldPassword':'UniquePassword.1'
//       })
//       .expect(401)
  
  
//   }),

//   test('should return a 200 and otp' , async()=>{

//     const res=  await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201)


//  const res2 =    await request(app).post("/api/auth/forgotPassword")
//     .send({
//        'phoneNumber': '+233507069807'
//     })
//   .expect(200) 
 

//   expect(res2.body.data.otp).toBeDefined()


//   }) ,

//   test('should return a 422' , async()=>{
//     await request(app).post('/api/auth/signup') .send({
//         'name':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
//         'confirmpassword':'UniquePassword.1'
//     })
//     .expect(201)

//  await request(app).post("/api/auth/forgotPassword")
//     .send({
//        'phoneNumber': '+23350706907'
//     })
//   .expect(422) 
 



    
//   }) 
//  , test('should return a 200 and otp' , async()=>{

//     const user = await new Client({
//         name:'krke' ,
//         phoneNumber: '+233507069806', 
//         email:'kelvinkkrerkr' , 
//         otp:211111 ,
//         password:'e3233'
//     }).save()
   

//     console.log(user) ; 


//     await request(app).post("/api/auth/verifypasswordotp")
//     .send({
//         'otp':user.otp ,
//         'phoneNumber':user.phoneNumber
//     }).expect(200)

// }) ,
// test('should return a 401 if otp is wrong' , async()=>{

//     const user = await new Client({
//         name:'krke' ,
//         phoneNumber: '+233507069806', 
//         email:'kelvinkkrerkr' , 
//         otp:211111 ,
//         password:'e3233'
//     }).save()
   

//     console.log(user) ; 


//     await request(app).post("/api/auth/verifypasswordotp")
//     .send({
//         'otp':333333 ,
//         'phoneNumber':user.phoneNumber
//     }).expect(401)

// }) 

// // test('should return a 200 if otp is wrong' , async()=>{

// //     const user = await new Client({
// //         name:'krke' ,
// //         phoneNumber: '+233507069806', 
// //         email:'kelvinkkrerkr' , 
// //         otp:211111 ,
// //         password:'e3233'
// //     }).save()
   

// //     // console.log(user) ; 


// //     await request(app).post("/api/auth/changePassword")
// //     .send({
// //         'phoneNumber': user.phoneNumber,
// //         'password': 'Uniquepassword.11' , 
// //         'confirmPassword':'Uniquepassword.11'
// //     }).expect(200)

  
     
  

// // }) 

// }
// )