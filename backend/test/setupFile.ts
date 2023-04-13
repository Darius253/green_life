import { MongoMemoryServer } from "mongodb-memory-server"; 
import request from 'supertest'; 
import jwt from 'jsonwebtoken' ;
import mongoose  from "mongoose";
let mongo:any ;
beforeAll(async () => {
  process.env.JWT_SECRET = "1212";
  process.env.JWT_refresh = "1111";
  process.env.otp_expiry= '5'
process.env.locked_tries= '3'
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
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