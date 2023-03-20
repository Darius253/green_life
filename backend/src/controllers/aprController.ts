import { IAPR } from "@models/models.interface";
import { APR } from "@models/APR";
import  {Request, Response} from 'express';



//creating a single apr // The apr must be only one . the admin can
//change it time from time 


export const createApr = async (req:Request  ,res:Response) => {

 
    const  {interestRate , charges} = req.body ; 

    //check if an apr already exists 
    //if apr already exist throw an error
     
 const count =  await APR.count() ; 

 if(count > 0 ){
    throw  new Error("failed to create apr")
 }
 


    const apr =  new APR({
        interestRate , charges 
    })

    await apr.save() ; 


    res.status(201).send({

        success:true , data:{
            apr
        }
    })


    
}

//return loan summary to user 
export const loanSummary = async (req:Request  ,res:Response) => {
    
 const apr  =  await APR.findOne() ; 
 
  if(!apr){
     throw new Error("Server error") ; 
  }


  
  const  amount =  apr.calcApr(req.body.principal) ; 

  res.send({
    success:true ,data:{
         interestRate:apr.interestRate , 
         charges:apr.charges , 
          amount
    }
  })






}



///changing the charges or the interest rate on a loan 

export  const editApr =  async(req:Request ,res:Response)=>{
      
  const  {interestRate , charges } = req.body ;

     
  const  apr =  await  APR.findOne() ; 

   if(!apr){
      throw new Error("Server error"); 
    }

apr.interestRate = interestRate ; 
apr.charges =  charges ; 

await apr.save() ; 



res.send({
    success:true , data:{
        apr
    }
})




} 


export const getApr = async (req:Request, res:Response) => {
      

    const Apr =  await APR.findOne() ;
     
    if(!APR)
              throw new Error("Server error"); 

  
     res.send({
        success:true , data:{
            Apr
        }
     })
}