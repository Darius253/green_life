import * as redis from 'redis-om' ; 
import { Policy, policySchema ,} from './models/Policy';

export let  policyRepo:redis.Repository<Policy>; 

(async()=>{
 
//       import { createClient } from 'redis';

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