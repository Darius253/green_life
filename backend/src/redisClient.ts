import * as redis from 'redis-om' ; 
import {createClient} from 'redis' ;
;
import  {policySchema ,Policy} from './models/Policy'
export let policyRepo: redis.Repository<Policy>; 
 
//       import { createClient } from 'redis';

   
// const client = createClient({
//     password: 'H4hQHon6Q8rU6MupDOE84bsw1CYG74jT',
//     socket: {
//         host: 'redis-11884.c52.us-east-1-4.ec2.cloud.redislabs.com',
//         port: 11884
//     }
// });

  
 export const connectRedis =  async ()=>{
 
      const redisClient =  createClient({
            password: 'C9gvJea8SY97HGmkD4HiwL4KV4Jth0M5',
            socket: {
                host: 'redis-16022.c10.us-east-1-2.ec2.cloud.redislabs.com',
                port: 16022
            }
            });;
      await redisClient.connect() ;
      // console.log(redisClient)
         const client = await new redis.Client().use(redisClient)
         policyRepo = client.fetchRepository(policySchema);
         await policyRepo.createIndex(); 

         console.log(policyRepo)
}

