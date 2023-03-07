import  {Types} from 'mongoose'
export interface Iuser{

 name:string ;
 email:string;
 phoneNumber:string ;
 password:string ;
 registered:boolean
 registration:Types.ObjectId


} 