
import { ACTIONS } from "actions";
export class BadAuthError extends Error{


       constructor(public message:string , public statusCode:number  , public action:ACTIONS){


            super(message) ;


            Object.setPrototypeOf(this , BadAuthError.prototype)
       }




      serialize(){
          
        return  {

            msg:this.message ,
            param:"" ,
             value:''
            
        }


      }
}