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
    
 process.on("SIGTERM" , async ()=>{
        
  await conn.connection.close()
 }) 

  process.on("SIGINT", async () => {
    await conn.connection.close();
  }); 

app.listen(PORT, () => {
  console.log("Sever opened");
});


}
)()

