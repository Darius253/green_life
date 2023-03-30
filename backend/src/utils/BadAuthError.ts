

export class BadAuthError extends Error{


       constructor(public message:string , public statusCode:number ){


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