import { MongoMemoryServer } from "mongodb-memory-server"; 
import request from 'supertest'; 
import jwt from 'jsonwebtoken' ;
import mongoose  from "mongoose";
import * as redis from 'redis-om' ; 
import { Policy, policySchema ,} from '../src/models/Policy';

export let  policyRepo:redis.Repository<Policy>
let mongo:any ;
beforeAll(async () => {
  process.env.JWT_SECRET = "1212";
  process.env.JWT_refresh = "1111";
  process.env.otp_expiry= '5'
process.env.locked_tries= '3'
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
  const client =  await new redis.Client().open("redis://kelvin21:H4hQHon6Q8rU6MupDOE84bsw1CYG74jT@redis-11884.c52.us-east-1-4.ec2.cloud.redislabs.com:1184") ;  
  policyRepo =  client.fetchRepository(policySchema) ; 
   await policyRepo.createIndex() ; 
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // await mongo.stop();
  await mongoose.connection.close();
});



export function returnJwt(obj:{id:any , email:any ,role?:any }){

 
 
  return jwt.sign(obj , process.env.JWT_SECRET! , {expiresIn:'1hr'})





}