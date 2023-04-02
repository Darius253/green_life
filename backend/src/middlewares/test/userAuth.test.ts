import  {isAdmin , isRegionalAgent, userAuth} from '../userAuth'


describe("user auth" , ()=>{


test("should return an error if user role is not admin" , ()=>{

    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "amodn"
       }
    } 
    const res = {
        
    }



    expect(()=>isAdmin(req  ,res, next)).toThrow() ;

    

}) , 


test("should return an error if user role is not admin or regional manager" , ()=>{

    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "amodn"
       }
    } 
    const res = {
        
    }


    expect(()=>isRegionalAgent(req , res, next)).toThrow()
}) , 

test("should return an error if its not a user" ,()=>{
    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "amodn"
       }
    } 
    const res = {
        
    }


    expect(()=>userAuth(req , res, next)).toThrow()
}),

test('should call next function' ,()=>{

    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "AGENT"
       }
    } 
    const res = {
         


    }
    
   
    userAuth(req , res, next) ; 

    expect(next).toBeCalled()
}),

test("should call next when user role  is regionalgent"  ,()=>{
      
    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "REGIONALAGENT"
       }
    } 
    const res = {
         


    }
    
   
    isRegionalAgent(req , res, next) ; 

    expect(next).toBeCalled()
}) ,
test("should call next when user role is ADMIn " ,()=>{
    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "ADMIN"
       }
    } 
    const res = {
         


    }
    
   
    isRegionalAgent(req , res, next) ; 

    expect(next).toBeCalled()
}) ,

test("should call next when user role is admin" ,()=>{
    const next =  jest.fn() ; 

    const req = {
       user:{
        role : "ADMIN"
       }
    } 
    const res = {
         


    }
    
   
    isAdmin(req , res, next) ; 

    expect(next).toBeCalled()
})
})