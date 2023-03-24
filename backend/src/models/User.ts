import  mongoose, {Schema , model ,Model, VirtualType} from 'mongoose' ; 
import  {Iclient, userlock ,Authclass, otpLock} from './models.interface'; 
import  {hash  ,genSalt} from 'bcrypt' ;
import  moment from 'moment';

const lock = new Schema<userlock>({
   
  tries:{type:Number, required:true , default:0} , 
  expiresAt:{type:Date , default:null}
  
   
})
//todo
//update password controller . forgot password and change number

const otplock =  new Schema<otpLock>({

   otpTries:{type:Number, required:true   ,default:0}  , 
   expiresAt:{type:Date, default:null}
})


type clientModel =  Model<  Iclient, {}, Authclass>  ; 

const clientSchema = new Schema<Iclient , Authclass , clientModel>({
  
     
name:{type:String , required:true} , 
phoneNumber:{type:String , required:true  ,unique:true} , 
email:{type:String, required:true , unique:true},
registered:{type:Boolean , default:false , required:true} , 
verified:{type:Boolean , default:false , required:true} , 
lock:lock , 
otp: {type:Number , default:null} ,
otpLock:otplock,
password:{type:String , required:true }

} , {
    timestamps:true , toJSON:{
         transform(doc, ret, options) {
             ret.id =  ret._id ;
             delete ret.password ;
             delete ret._id ;
         },
       
    } ,
  
      
    
 
})



clientSchema.method("userLocked" , function(this:Iclient){
//fetch the expired time
 let x =  moment(this.lock.expiresAt ) 
 //fetch the present
 let  y=  moment() ; 

//  console.log(x.diff(y))
//  console.log("dere", Math.round(moment.duration(x.diff(y)).asMinutes()));

//find the duration between the expiry time and the present time..
//if the lock has expired return true
 if (Math.round(moment.duration(x.diff(y)).asMinutes())<=0){
  // console.log("de")
  return false ; 
 }

//  console.log(moment().to(this.lock.expiresAt))
// console.log(this.lock.tries, parseInt(process.env.locked_tries!));
   return this.lock.tries > parseInt(process.env.locked_tries!);



})


clientSchema.method("otpLocked" , function(){
    // console.log(this)
  
  let x = moment(this.otpLock.expiresAt);
  let y = moment()

  //check if the otp lock has expired and return false;
  if (Math.round(moment.duration(x.diff(y)).asMinutes()) <= 0 ){
          
    // this.set("otplock.otpTries" , 0) ;
    // this.set("otplock.expiresAt" ,  null) ;
        
return false;
  };



  //check if the opt tries is greater than the approved otp tries
  return this.otpLock.otpTries > parseInt(process.env.otp_tries!); 



})

     

clientSchema.pre("save" ,  async function(next){
     
   if(this.isModified("password")){
     const salt = await genSalt(12) ;
       const hashed =  await hash(this.password  , salt); 
       this.set("password" , hashed);
   } 
  next()

}) ; 

// userSchema.virtual("userLocked").get(function(){
//   return false ;
// })

export const Client=  model<Iclient , clientModel>("USER" , clientSchema);



