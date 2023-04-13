// import request from "supertest";
// import {app} from '../../app' ; 
// import {User} from '../../models/User'

// const createUser =  async()=>{

//  const user = await new User({
//         FullName:'kelvinvaidem',
//         email:'ekvlkve"cre',
//         'password':'PasswordUnique1',
//         phoneNumber: '+233507069806',
//         otpLock: {
//           otpTries: 0,
//         },
//         lock: {
//           tries: 0,
//         },
//       });
    
//       await user.save();
    
// return user
// }
// describe('testing user routes' ,()=>{



//     test('should return 200' , async ()=>{
    
//         await request(app).post('/api/user/auth/create')
//         .send({
//         'FullName':'Kelvin Ato Baiden' , 
//         'email':'edenrer@gmail.com' ,
//         'password':'Uniquepassword.1' , 
//         'phoneNumber':'+233507069806'
//         })
//         .expect(200)
       

//     }) , 

//     test('should return  a 200' , async()=>{
//         await request(app).post('/api/user/auth/create')
//         .send({
//         'FullName':'Kelvin Ato Baiden' , 
//         'email':'edenrer@gmail.com' ,
//         'password':'Uniquepassword.1' , 
//         'phoneNumber':'+233507069806'
//         })
//         .expect(200)

//        await request(app).post('/api/user/auth/userlogin')
//        .send({
//         'phoneNumber':'+233507069806'  ,
//         'password': 'Uniquepassword.1'
//        }).expect(200)


//     }) , 

//     test('should return a 401' , async()=>{
//         await request(app).post('/api/user/auth/userlogin')
//        .send({
//         'phoneNumber':'+233507069806'  ,
//         'password': 'Uniquepassword.1'
//        }).expect(401)

//     })  ,
//     test('should return a 422' , async()=>{
//         await request(app).post('/api/user/auth/userlogin')
//        .send({
//         'phoneNumber':'+2335070698'  ,
//         'password': 'Uniquepassword1'
//        }).expect(422)

//     }) 


//     ,




//     test('should return a 401' , async()=>{

//         await request(app).post('/api/user/auth/mobileverifyotp')
//         .send({
//             'otp':'232111' , 
//             'phoneNumber':'0207698017'
//         })
//         .expect(401)
//       })  , 
    
//       test('should return a ' , async()=>{
    
//         await request(app).post('/api/user/auth/verifyotp')
//         .send({
//             'otp':'232111' , 
//             'phoneNumber':'0207698017'
//         })
//         .expect(401)
//       }) ,
//       test('should return a ' , async()=>{
    
//         await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 
    
//     const res =     await request(app).post('/api/user/auth/userlogin')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(200)
    
//        const res2=  await request(app).post('/api/user/auth/verifyotp')
//         .send({
//             'otp':res.body.data.otp , 
//             'phoneNumber':res.body.data.phoneNumber
//         })
//         .expect(200)
    
    
//         expect(res2.headers['set-cookie']).toBeDefined()
//       }),
    
//     test('should return a 200' , async()=>{
//         await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 
//     const res =     await request(app).post('/api/user/auth/userlogin')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(200)
    
    
//     const otpres = await request(app).post('/api/user/auth/resendOtp')
//     .send({
//         'phoneNumber':res.body.data.phoneNumber 
//     }).expect(200) ; 
    
//     expect( otpres.body.data.otp).toBeDefined() ;
//     }) ,
//     test('should return a 200' , async()=>{
//         await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 
    
//     const res =     await request(app).post('/api/user/auth/userlogin')
//     .send({
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1'
//     }).expect(200)
    
//     await request(app).post('/api/user/auth/resendOtp')
//     .send({
//         'phoneNumber':res.body.data.phoneNumber 
//     }).expect(200)
//     }) 
//     ,
    
//     test('should return a 401', async()=>{
//      const res =    await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) ;
        

  
//         const res2=  await request(app)
//         .post('/api/user/auth/verifyOtp')
//         .send({
//             'otp':res.body.data.otp , 
//             'phoneNumber':res.body.data.phoneNumber
//         }).expect(200)
    
    

//         await request(app).post('/api/client/resetPassword')
//         .set('authorization' , 'Bearer '+res2.body.data.accessToken)
//         .send({
//             'password':'UniqewuePassword.12' , 
//             'oldPassword':'UniquePassword.1'
//         })
//         .expect(200)
    
    
//     }) ,
//     test('should return a 401', async()=>{
//      await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 

//     const res =     await request(app).post('/api/user/auth/userlogin') .send({
//         'FullName':'kelvin Ato',
//         'email':'test@test.com' ,
//         'phoneNumber':'+233507069807' ,
//         'password':'UniquePassword.1' ,
        
//     })
//     .expect(200) 
        
//           const res2=  await request(app)
//           .post('/api/user/auth/verifyOtp')
//           .send({
//               'otp':res.body.data.otp , 
//               'phoneNumber':res.body.data.phoneNumber
//           }).expect(200)
      
      
      
      
      
//           await request(app)
          
//           .post('/api/client/resetPassword')
//           .set('authorization' , 'Bearer '+res2.body.data.accessToken)
//           .send({
//               'password':'UniquePassword.1' , 
//               'oldPassword':'UniquePassword.1'
//           })
//           .expect(401)
      
      
//       }),
    
//       test('should return a 200 and otp' , async()=>{
    
//         const res= await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 
    
    
//      const res2 =    await request(app).post("/api/user/auth/forgotPassword")
//         .send({
//            'phoneNumber': '+233507069807'
//         })
//       .expect(200) 
     
    
//       expect(res2.body.data.otp).toBeDefined()
    
    
//       }) ,
    
//       test('should return a 422' , async()=>{
//         await request(app).post('/api/user/auth/create') .send({
//             'FullName':'kelvin Ato',
//             'email':'test@test.com' ,
//             'phoneNumber':'+233507069807' ,
//             'password':'UniquePassword.1' ,
            
//         })
//         .expect(200) 
    
//      await request(app).post("/api/user/auth/forgotPassword")
//         .send({
//            'phoneNumber': '+23350706907'
//         })
//       .expect(422) 
     
    
    
    
        
//       }) 
//      , test('should return a 200 and otp' , async()=>{
    
//         const user = await new User({
//             FullName:'krke' ,
//             phoneNumber: '+233507069806', 
//             email:'kelvinkkrerkr' , 
//             otp:211111 ,
//             password:'e3233'
//         }).save()
       
    
      
    
    
//         await request(app).post("/api/user/auth/verifypasswordotp")
//         .send({
//             'otp':user.otp ,
//             'phoneNumber':user.phoneNumber
//         }).expect(200)
    
//     }) ,
//     test('should return a 401 if otp is wrong' , async()=>{
    
//         const user = await new User({
//             FullName:'krke' ,
//             phoneNumber: '+233507069806', 
//             email:'kelvinkkrerkr' , 
//             otp:211111 ,
//             password:'e3233'
//         }).save()
       
    
        
    
    
//         await request(app).post("/api/user/auth/verifypasswordotp")
//         .send({
//             'otp':333333 ,
//             'phoneNumber':user.phoneNumber
//         }).expect(401)
    
//     }) 
    
//     // test('should return a 200 if otp is wrong' , async()=>{
    
//     //     const user = await new Client({
//     //         name:'krke' ,
//     //         phoneNumber: '+233507069806', 
//     //         email:'kelvinkkrerkr' , 
//     //         otp:211111 ,
//     //         password:'e3233'
//     //     }).save()
       
    
//     //     // console.log(user) ; 
    
    
//     //     await request(app).post("/api/user/auth/changePassword")
//     //     .send({
//     //         'phoneNumber': user.phoneNumber,
//     //         'password': 'Uniquepassword.11' , 
//     //         'confirmPassword':'Uniquepassword.11'
//     //     }).expect(200)
    
      
         
      

// })