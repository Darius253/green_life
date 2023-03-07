

export class BadAuthError extends Error{


       constructor(public message:string , public code:number ){

             super(message)
       }




      serialize(){
          
        return  {

            mesage:this.message ,
            statusCode:this.code
        }


      }
}