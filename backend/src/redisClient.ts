import * as redis from 'redis-om' ; 
import { Policy, policySchema ,} from '@models/Policy';

export let  policyRepo:redis.Repository<Policy>; 

(async()=>{
 

     const client =  await new redis.Client().open() ;  
     policyRepo =  client.fetchRepository(policySchema) ; 
      await policyRepo.createIndex() ; 
     
})() 