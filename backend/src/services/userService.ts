import { User } from "@models/User";
import { BadAuthError } from "@utils/BadAuthError";
import { Request, Response } from 'express';


export class Userservice{
     
  

    async createUser(req:Request ,res:Response){
      
    
     

    }


    async getAllusers(req:Request ,res:Response){
        console.log(req.query)

        const filter:{
            FullName?:object , 
            role?:string
        }={} ;
        const limit = req.query["limit"]? parseInt(req.query["limit"].toString()) : 10
         
             
         
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
    
        
      const users =  await User.find(filter).limit(limit) ;  


      return res.send({
        success:true , data:{
            users
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
