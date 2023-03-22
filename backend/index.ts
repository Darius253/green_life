import { app } from "./src/app";
import  mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
import "dotenv/config"

(
async () => {
  

  if(!process.env.JWT_SECRET){
    throw new Error("jwt secret not found");
  }
  if(!process.env.JWT_refresh){
    throw new Error("jwt refresh no found");
  }
  if(!process.env.MONGO_URI){
    throw new Error("failed to connect to mongo because uri was not found");
  }

     

const conn =  await mongoose.connect(process.env.MONGO_URI) ; 
   console.log(conn.connection.host);


   

app.listen(PORT, () => {
  console.log("Sever opened");
});


}
)()



/*

To get a personal loan, you need to apply to a lender. Again, this can be a bank, credit union, or online personal loan lender. 

Generally, you would first complete an application. The lender reviews it and decides whether to approve or deny it. If approved, you’ll be given the loan terms, which you can accept or reject. If you agree to them, the next step is finalizing your loan paperwork. 

When that’s done, the lender will fund the loan, which means paying you the proceeds. Depending on the lender, these may arrive through a direct deposit into your bank account or a check. After the loan is funded, you can use the money as you see fit. You then have to begin repaying the loan according to the terms established in your loan agreement. 

*/
