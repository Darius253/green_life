import  {Schema , model} from  'mongoose'
import { IAdmin, userRole } from './models.interface' ; 
import {hash ,genSalt} from 'bcrypt'



const AdminSchema =  new Schema<IAdmin>({

 
    FullName:{type:String , required:true } , 
    email:{type:String , required:true , unique:true}, 
    password:{type:String , required:true}  , 
    Phonenumber:{type:String , required:true, unique:true} ,
    role:{type:String , enum:Object.values(userRole)  , default:userRole.Admin}

     


} ,  {
    timestamps:true ,  toJSON:{
        transform(doc, ret, options) {
            ret.id = ret._id ; 
            delete ret.password ; 
            delete ret._id
        },
    }
})



AdminSchema.pre("save" ,async function(next){
     
    const user = this ; 

    if(user.isModified("password")){
     
   const salt =  await genSalt(12) ; 

   const hashed =  await hash(user.password ,  salt) ; 
    
    user.set("password" , hashed);
        
    
    }
       next()

})


export const Admin = model("Admin" , AdminSchema) ; 