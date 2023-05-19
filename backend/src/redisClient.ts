// import * as redis from 'redis-om' ; 
import {createClient} from 'redis'
;


 
//       import { createClient } from 'redis';

<<<<<<< HEAD
     const client =  createClient({}) ;  
      client.on("connect" , ()=>{
            console.log("redis connected")
      })
       

      export {client as redisClient}
=======
// const client = createClient({
//     password: 'H4hQHon6Q8rU6MupDOE84bsw1CYG74jT',
//     socket: {
//         host: 'redis-11884.c52.us-east-1-4.ec2.cloud.redislabs.com',
//         port: 11884
//     }
// });

     const client =  await new redis.Client().open("redis://kelvin21:H4hQHon6Q8rU6MupDOE84bsw1CYG74jT@redis-11884.c52.us-east-1-4.ec2.cloud.redislabs.com:1184") ;  
     policyRepo =  client.fetchRepository(policySchema) ; 
      await policyRepo.createIndex() ; 
     
})() 
>>>>>>> fa8172860906624934a660afc4e0309a074b9c65
