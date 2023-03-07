import  {Request , Response} from 'express'
import  {User} from  '@models/User'  ; 
import { BadAuthError } from '@utils/BadAuthError';
import  {compare} from 'bcrypt' ;
import  jwt from 'jsonwebtoken' ; 
  
/* @ login controller for login in user returns 
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
   const accessToken =  jwt.sign({id:user._id, email:user.email} , process.env.JWT_SECRET! , {expiresIn:"1hr"}) ; 
 const refreshToken = jwt.sign({id:user._id , email:user.email} , process.env.JWT_refresh! , {expiresIn:"1hr"}) ;
  //if its from the web app set an http only cookie  

   if(req.headers["user-agent"]=== "Mozilla"){
    res.cookie("refreshToken" , refreshToken , {httpOnly:true , signed:true}) ; 
      return res.status(200).send({
       success: true,
       data: {
         user,
         accessToken
       }
     });
   }

  //if user is from the mobile app send refreshToken , including accessToken
 
    return  res.status(200).send({
       success: true,
       data: {
         user,
         accessToken, refreshToken
       },
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


          
    res.status(200).send({
         
        success:true 
    })  


}