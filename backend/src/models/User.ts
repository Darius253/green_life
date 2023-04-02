import  {Schema , model, Model} from  'mongoose'
import { Iuser, userRole, Authclass, userlock, otpLock } from './models.interface' ; 
import {hash ,genSalt} from 'bcrypt'
import moment from 'moment' 




const lockSchema  = new Schema<userlock>({
    tries:{type:Number ,required:true ,default:0} , 
    expiresAt:{type:Date , default:null}
})

const otpLockSchema = new Schema<otpLock>({
  otpTries: { type: Number, required: true, default: 0 },
  expiresAt:{type:Date , default:null}
});

type UserModel =  Model<Iuser ,{} ,  Authclass>

const userSchema = new Schema<Iuser ,Authclass , UserModel>(
  {
    // FullName:{type:String , required:true } ,
    // email:{type:String , required:true , unique:true},
    // password:{type:String , required:true}  ,
    // PhoneNumber:{type:String , required:true, unique:true} ,
    // role:{type:String , enum:Object.values(userRole)  , default:userRole.Admin}

    FullName: { type: String, required: true }, 
    email:{type:String , required:true , unique:true} , 
    password:{type:String ,required:true} , 
    phoneNumber:{type:String , required:true ,unique:true} , 
    role:{type:String  ,required:true , enum:Object.values(userRole) , default:userRole.AGENT} ,
    lock:lockSchema , 
    otpLock:otpLockSchema , 
    otp:{type:Number , default:null} , 
    verified:{type:Boolean , required:true ,default:false}
     
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
      },
    },
  }
);



userSchema.pre("save" ,async function(next){
     
    const user = this ; 

    if(user.isModified("password")){
     
   const salt =  await genSalt(12) ; 

   const hashed =  await hash(user.password ,  salt) ; 
    
    user.set("password" , hashed);
        
    
    }
       next()

})


userSchema.method("userLocked" , function(){

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



}) ; 

userSchema.method("otpLocked" , function(){
 
  let x = moment(this.otpLock.expiresAt);
  let y = moment();

  //check if the otp lock has expired and return false;
  if (Math.round(moment.duration(x.diff(y)).asMinutes()) <= 0) {
    // this.set("otplock.otpTries" , 0) ;
    // this.set("otplock.expiresAt" ,  null) ;

    return false;
  }

  //check if the opt tries is greater than the approved otp tries
  return this.otpLock.otpTries > parseInt(process.env.otp_tries!); 
})

export const User= model<Iuser , UserModel>("User" , userSchema) ; 