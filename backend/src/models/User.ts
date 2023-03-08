import  {Schema , model} from 'mongoose' ; 
import  {Iuser} from './models.interface'; 
import  {hash  ,genSalt} from 'bcrypt'



const userSchema = new Schema<Iuser>({
  
     
name:{type:String , required:true} , 
phoneNumber:{type:String , required:true  ,unique:true} , 
email:{type:String, required:true , unique:true},
registered:{type:Boolean , default:false , required:true} , 
registration:{type:Schema.Types.ObjectId , ref:"REGISTRATION"} , 
password:{type:String , required:true }

} , {
    timestamps:true , toJSON:{
         transform(doc, ret, options) {
             ret.id =  ret._id ;
             delete ret.password ;
             delete ret._id ;
         },
    }
})

     

userSchema.pre("save" ,  async function(next){
     
   if(this.isModified("password")){
     const salt = await genSalt(12) ;
       const hashed =  await hash(this.password  , salt); 
       this.set("password" , hashed);
   } 
  next()

}) ; 


export const User =  model("USER" , userSchema);