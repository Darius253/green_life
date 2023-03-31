import { userRole } from "@models/models.interface";


export interface  Payload{
    id:string ;
    role?:userRole;
    email:string;
}