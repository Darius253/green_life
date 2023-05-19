// import * as redis from 'redis-om' ; 
import {createClient} from 'redis'
;


 

     const client =  createClient({}) ;  
      client.on("connect" , ()=>{
            console.log("redis connected")
      })
       

      export {client as redisClient}