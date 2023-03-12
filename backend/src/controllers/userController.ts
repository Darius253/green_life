import  {Request , Response} from 'express'
import  {User} from  '../models/User'  ; 
// import  {User} from  '@models/User'  ; 
import { BadAuthError } from  '../utils/BadAuthError';
// import { BadAuthError } from '@utils/BadAuthError';
import  {compare} from 'bcrypt' ;
import  jwt from 'jsonwebtoken' ; 
import { Payload } from 'app.interface';
  
/* @ web app login controller for login in user returns 
returns user details after checking if user exists.
*/

export async function  login(req:Request , res:Response) {

    const  {email ,password} = req.body ; 

     //check if user exist 
   const user  = await User.findOne({email}) ; 

     if(!user){
        throw new  BadAuthError("Email or password is incorrect" , 401); 
     }

    
  //compare password  , with user's hashpassword.. send error if password is incorrect 
        
  const isValid =  await compare(password , user.password) ;

  if(!isValid){
    throw new BadAuthError("Email or password is incorrect", 401); 
      
  }
    
       //creat two jwt one as a refreshToken  and one as an accessToken
  //create a jwt for user   
   const accessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"15m"}) ; 
 const refreshToken = jwt.sign({id:user._id , email:user.email} , process.env.JWT_refresh! , {expiresIn:"1hr"}) ;
  //if its from the web app set an http only cookie  
      

            //create an http only cookie containing the refreshToken
    res.cookie("refreshToken" , refreshToken , {httpOnly:true , signed:true}) ; 
      return res.status(200).send({
       success: true,
       data: {
         user,
         accessToken
       }
     });
   



}


/*@ signup controller creates a user and returns success:true message 
it validates the user information as well  
*/
export async function signup(req:Request , res:Response){

    const {name,  email , phoneNumber , password} =  req.body ; 
     //check if email is  available 
    const EmailExist =  await  User.findOne({email}) ; 
    if(EmailExist){
        throw new BadAuthError("Email already exist" , 400);
    }  

      
    //check if phoneNumber is  already in use
    
    const phoneNumberExist =  await User.findOne({phoneNumber})  ; 
    if(phoneNumberExist){
        throw new BadAuthError("phone number already exist" , 400) ; 
    }


 //create and save user
     const user =  new User({
        name , email , phoneNumber  , password
      }) 


      await user.save() ; 


          
    res.status(201).send({
         
        success:true 
    })  


}

 //@ mobileLogin for users  with mobile apps ,create a refreshToken and accessToken
 //sends both to user .
export const mobileLogin =async (req:Request , res:Response) => {
    
     const { email, password } = req.body;

     //check if user exist
     const user = await User.findOne({ email });

     if (!user) {
       throw new BadAuthError("Email or password is incorrect", 401);
     }

     //compare password  , with user's hashpassword.. send error if password is incorrect

     const isValid = await compare(password, user.password);

     if (!isValid) {
       throw new BadAuthError("Email or password is incorrect", 401);
     }

     //creat two jwt one as a refreshToken  and one as an accessToken
     //create a jwt for user
     const accessToken = jwt.sign(
       { id: user._id, email: user.email  },
       process.env.JWT_SECRET!,
       { expiresIn: "15m" }
     );
     const refreshToken = jwt.sign(
       { id: user._id, email: user.email },
       process.env.JWT_refresh!,
       { expiresIn: "1hr" }
     );
     //if its from the web app set an http only cookie

    //send the user , accessToken and refreshToken to the user
     return res.status(200).send({
       success: true,
       data: {
         user,
         accessToken,
         refreshToken
       },
     });
   

}


 //request for accessToken with the refresh token cookie
 //return error if refresh token has expired 
export const requestAccessToken  = async (req:Request , res:Response)=>{
       
const {refreshToken} =  req.signedCookies ; 
     
if(!refreshToken){
  throw new BadAuthError("Authorization failed" , 401); 
}


try {
   
const payload =  jwt.verify(refreshToken , process.env.JWT_refresh!) as Payload
 

const user = await  User.findById(payload.id) ; 

if(!user){

  throw new BadAuthError("Authorization failed" , 401); 
}
 

const newaccessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"15m"}) 
 


res.status(200).send({
  success: true,
  data: {
    accessToken: newaccessToken,
  },
});
 

 
} catch (error) {
  console.log(error)
    throw new BadAuthError("Authorization failed", 401); 
}

}


 //request for accessToken with the refresh token header
 //return error if refresh token has expired 
export const requestAccessTokenMobile =  async (req:Request , res:Response)=>{
      console.log("f")
const refreshToken =  req.headers["x-refresh-token"] as string ; 
     
//check if header exist with the request;
if(!refreshToken){
  throw new BadAuthError("Authorization failed" , 401); 
} 
 
//take the token from the string  : refreshToken =  "Bearer {$Token}"
  const  [_ ,token ] =  refreshToken.split(" ") ;

  //extra check for token to improve security
  if (!token) {
    throw new BadAuthError("Authorization failed", 401);
  } 
try {
   
  //verify token
const payload =  jwt.verify(token , process.env.JWT_refresh!) as Payload
 

const user = await  User.findById(payload.id) ; 

if(!user){

  throw new BadAuthError("Authorization failed" , 401); 
}
 
//create new user
const newaccessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"15m"}) 
 


res.status(200).send({
  success: true,
  data: {
    accessToken: newaccessToken,
  },
});
 

 
} catch (error) {
  console.log(error)
    throw new BadAuthError("Authorization failed", 401); 
}

}


/*
const mongoose = require('mongoose');

const RegistrationFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  age: {
    type: Number,
    required: true
  },
  employmentStatus: {
    type: String,
    required: true,
    enum: ['Employed', 'Unemployed', 'Self-employed']
  },
  employer: {
    type: String,
    default: null
  },
  occupation: {
    type: String,
    default: null
  },
  income: {
    type: Number,
    default: null
  }
});

// Set employer, occupation, and income fields to required if employment status is Employed or Self-employed
RegistrationFormSchema.path('employer').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Employer name is required for employed or self-employed applicants.');

RegistrationFormSchema.path('occupation').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Occupation is required for employed or self-employed applicants.');

RegistrationFormSchema.path('income').required(function() {
  return this.employmentStatus === 'Employed' || this.employmentStatus === 'Self-employed';
}, 'Income is required for employed or self-employed applicants.');

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);


*/