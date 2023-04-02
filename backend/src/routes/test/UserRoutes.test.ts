// // import request   from "supertest";
// // import {User} from '../../models/User' ; 
// // import {app} from '../../app'; 


// // describe("testing the routes" , ()=>{

// // test("expect to return a status of 201" , async()=>{
      

// //     request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201)


// // }) , 

// // test("expect to return a 400" , async ()=>{
   

// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201)


// //     await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //         name:"ekwekw" , 
// //         phoneNumber:"121212121" , 
// //         password:"223sdccerfefe"  ,
// //         email:"lsdkslmer@gmial.com"
// //      })
// //     .expect(400)



// // })


// //  test("it should return a 400" ,  async ()=>{
// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201)


//     await request(app)
//     .post("/api/auth/signup")
//     .send({
//         name:"ekwekw" , 
//         phoneNumber:"121212121" , 
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmegr@gmial.com"
//      })
//     .expect(400)

//  })


//  , 

//  test("login , it should return a 201", async ()=>{
        
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/login")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     expect(logres.headers["set-cookie"]).toBeDefined()

 




//  }) 


//  ,
//  test("login , it should return a 200 and body should be defined" ,  async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


// //    const logres =  await request(app)
// //     .post("/api/auth/login")
// //     .send({
// //         password:"223sdccerfefe"  ,
// //         email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(200)
// //     // console.log(logres.header)
// //     expect(logres.body.data.accessToken).toBeDefined()


// //  })

// //   , 

// //   test("it should return a 200 , should check if user is defined " , async ()=>{
// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/login")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     expect(logres.body.data.user).toBeDefined()

//   })


//   ,
//   test("should return  401 " , async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


// //    const logres =  await request(app)
// //     .post("/api/auth/login")
// //     .send({
// //         password:"223sccerfefe"  ,
// //         email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(401)
// //     // console.log(logres.header)
// //     // expect(logres.body.data.user).toBeDefined()

// //   }) , 

// //   test("login , it should return a 200", async ()=>{
        
// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/mobileLogin")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     // expect(logres.headers["set-cookie"]).toBeDefined()

 




//  }) 


//  ,
//  test("login , it should return a 200 and body should be defined" ,  async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/mobileLogin")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     expect(logres.body.data.accessToken).toBeDefined()


//  })

//   , 

//   test("it should return a 200 , should check if user is defined " , async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


// //    const logres =  await request(app)
// //     .post("/api/auth/mobileLogin")
// //     .send({
// //         password:"223sdccerfefe"  ,
// //         email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(200)
// //     // console.log(logres.header)
// //     expect(logres.body.data.user).toBeDefined()

// //   })
// // ,
// // test("it should return a 200 , should check if user is defined " , async ()=>{
// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/mobileLogin")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     expect(logres.body.data.refreshToken).toBeDefined()

//   })


//   ,
//   test("should return  401 " , async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/mobileLogin")
//     .send({
//         password:"223sccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(401)
//     // console.log(logres.header)
//     // expect(logres.body.data.user).toBeDefined()

//   }) 

//    ,


//    test("should return a 200" ,async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 

//       const logres = await request(app)
//         .post("/api/auth/login")
//         .send({
//           password: "223sdccerfefe",
//           email: "lsdkslmer@gmial.com",
//         })
//         .expect(200);
//       // console.log(logres.header)
//       const refreshToken = logres.headers["set-cookie"][0];
//       // expect(logres.body.data.user).toBeDefined()

//       await request(app)
//         .get("/api/auth/request")
//         .set("Cookie", refreshToken)
//         .expect(200);
//     }),
//     test("should return a 401", async () => {
//       const res = await request(app)
//         .post("/api/auth/signup")
//         .send({
//           name: "ekwekw",
//           phoneNumber: "121212121",
//           password: "223sdccerfefe",
//           email: "lsdkslmer@gmial.com",
//         })
//         .expect(201);

//       const logres = await request(app)
//         .post("/api/auth/login")
//         .send({
//           password: "223sdccerfefe",
//           email: "lsdkslmer@gmial.com",
//         })
//         .expect(200);
//       // console.log(logres.header)
//       const refreshToken = logres.headers["set-cookie"][0];
//       // expect(logres.body.data.user).toBeDefined()

//       await request(app)
//         .get("/api/auth/request")

//         .expect(401);
//     }),
//     test("should return a 200", async () => {
//       const res = await request(app)
//         .post("/api/auth/signup")
//         .send({
//           name: "ekwekw",
//           phoneNumber: "121212121",
//           password: "223sdccerfefe",
//           email: "lsdkslmer@gmial.com",
//         })
//         .expect(201);

// //    const logres =  await request(app)
// //     .post("/api/auth/login")
// //     .send({
// //         password:"223sdccerfefe"  ,
// //         email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(200)
// //     // console.log(logres.header)
// //     const  refreshToken=  logres.headers["set-cookie"][0]
// //     // expect(logres.body.data.user).toBeDefined()
      
     
// //    await request(app)
// //     .get("/api/auth/request")
// //     .set("Cookie" ,refreshToken )
// //     .expect(200)
// //   }) 
// //     ,
// //     test("should return a 401" ,async ()=>{
// //         const res =  await request(app)
// //         .post("/api/auth/signup")
// //         .send({
// //            name:"ekwekw" , 
// //            phoneNumber:"121212121" , 
// //            password:"223sdccerfefe"  ,
// //            email:"lsdkslmer@gmial.com"
// //         })
// //         .expect(201) 
    
    
// //        const logres =  await request(app)
// //         .post("/api/auth/login")
// //         .send({
// //             password:"223sdccerfefe"  ,
// //             email:"lsdkslmer@gmial.com"
// //         })
// //         .expect(200)
// //         // console.log(logres.header)
// //         const  refreshToken=  logres.headers["set-cookie"][0]
// //         // expect(logres.body.data.user).toBeDefined()
          
         
// //        await request(app)
// //         .get("/api/auth/request")
        
// //         .expect(401)
// //       }) 
       
// //    ,

// //    test("should return a 200" ,async ()=>{
// //     const res =  await request(app)
// //     .post("/api/auth/signup")
// //     .send({
// //        name:"ekwekw" , 
// //        phoneNumber:"121212121" , 
// //        password:"223sdccerfefe"  ,
// //        email:"lsdkslmer@gmial.com"
// //     })
// //     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/login")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     const  refreshToken=  logres.headers["set-cookie"][0]
//     // expect(logres.body.data.user).toBeDefined()
      
     
//   const reqRes=  await request(app)
//     .get("/api/auth/request")
//     .set("Cookie" ,refreshToken )
//     .expect(200)
 

//      expect(reqRes.body.data.accessToken).toBeDefined()
    
//   }) 
//  ,
//  test("should return a 401" ,async ()=>{
//     const res =  await request(app)
//     .post("/api/auth/signup")
//     .send({
//        name:"ekwekw" , 
//        phoneNumber:"121212121" , 
//        password:"223sdccerfefe"  ,
//        email:"lsdkslmer@gmial.com"
//     })
//     .expect(201) 


//    const logres =  await request(app)
//     .post("/api/auth/mobileLogin")
//     .send({
//         password:"223sdccerfefe"  ,
//         email:"lsdkslmer@gmial.com"
//     })
//     .expect(200)
//     // console.log(logres.header)
//     const  refreshToken= "Dwew"
//     // expect(logres.body.data.user).toBeDefined()
      
     
//    await request(app)
//     .get("/api/auth/requestMobile")
//     .set("Cookie" ,refreshToken )
//     .expect(401)
//   }) 
//     , 
//     test("should return a 200" ,async ()=>{
//         const res =  await request(app)
//         .post("/api/auth/signup")
//         .send({
//            name:"ekwekw" , 
//            phoneNumber:"121212121" , 
//            password:"223sdccerfefe"  ,
//            email:"lsdkslmer@gmial.com"
//         })
//         .expect(201) 
    
    
//        const logres =  await request(app)
//         .post("/api/auth/mobileLogin")
//         .send({
//             password:"223sdccerfefe"  ,
//             email:"lsdkslmer@gmial.com"
//         })
//         .expect(200)
//         // console.log(logres.header)
//         const {refreshToken} =  logres.body.data
//         // expect(logres.body.data.user).toBeDefined()
          
         
//        await request(app)
        
//         .get("/api/auth/requestMobile")
    
//         .set('x-refresh-token'  ,'Bearer '+refreshToken)
//          .expect(200)
//       }) 

//        ,

//        test("should return a 200" ,async ()=>{
//         const res =  await request(app)
//         .post("/api/auth/signup")
//         .send({
//            name:"ekwekw" , 
//            phoneNumber:"121212121" , 
//            password:"223sdccerfefe"  ,
//            email:"lsdkslmer@gmial.com"
//         })
//         .expect(201) 
    
    
//        const logres =  await request(app)
//         .post("/api/auth/mobileLogin")
//         .send({
//             password:"223sdccerfefe"  ,
//             email:"lsdkslmer@gmial.com"
//         })
//         .expect(200)
//         // console.log(logres.header)
//         const {refreshToken} =  logres.body.data
//         // expect(logres.body.data.user).toBeDefined()
          
         
//       const reqRes =  await request(app)
        
//         .get("/api/auth/requestMobile")
    
//         .set('x-refresh-token'  ,'Bearer '+refreshToken)
//          .expect(200)

//         expect(reqRes.body.data.accessToken).toBeDefined()
//       }) 





   
// })