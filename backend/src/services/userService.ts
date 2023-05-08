import { User } from "../models/User";
import { BadAuthError } from "../utils/BadAuthError";
import { Request, Response } from 'express';


export class Userservice{
     
  

    async createUser(req:Request ,res:Response){
      
    
     

    }


    async getAllusers(req:Request ,res:Response){


        const filter:{
            FullName?:object , 
            role?:string
        }={} ;
        const limit = 10
         const page = req.query["page"]
           ? parseInt(req.query["page"].toString())
           : 1;
             
         
        for(let key in req.query){

              if(key === 'name' && req.query["name"]){
                filter["FullName"] = {
                
                    $regex: new RegExp(req.query[key]!.toString()||''),
                  
                };
              }
              else {

              if(key === 'role' && req.query["role"]){
                filter[key] =  req.query[key]?.toString()

              }

              }

        }
           
    
 console.log(filter)
    
        const count =  await User.find(filter).countDocuments() ;
      const users =  await User.find(filter).skip((page-1)*limit).limit(limit) ;  


      return res.send({
        success:true , data:{
            users , count
        }
      })
      



    }




    async getUser(req:Request, res:Response){


        const user=  await User.findById(req.params.id) ;

        if(!user){
            throw new BadAuthError("user does not exist" , 404) ;
        }


        return res.send({
           success:true , data:{
            user
           }
        })
    }
    

}
