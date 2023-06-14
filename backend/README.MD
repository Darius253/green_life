<h1>DOCUMENTATION FOR BACKEND </h1>
<h3>OVER 30 ENDPOINTS CATEGORIZED BELOW</h3>
<ul>
<li>CLIENT AUTH ENDPOINT</li>
<li>AGENT AUTH ENDPOINT</li>
<li>POLICY  ENDPOINT</li>
<li>LOAN ENDPOINT</li>
</ul>

<hr>

<h1>WARNING</h1>
<h4>ALL THE RELEVANT APIS  HAVE BEEN FULLY BUILT, HOWEVER ITERATIONS CAN BE MADE.</h4>

<h1>CLIENT AUTH ENDPOINT</h1>
  <h2>Login endpoint</h2>
   <p>/api/auth/login</p>
   <p>method :POST</p>
   <h4>BODY</h4>
     <ul>
     <li>phoneNumber:string : The  telephone number. Must be full international format (E164)  that is +23350609081 or 050609081 </li>
     <li>password:string : length should be between 8-100</li>
     </ul>
    <h4>Responses</h4>
    <p>200 created : {message:string , phoneNumber:string  ,resdata:{requestId:string , prefix:string}}</p>
    <p>401 unauthorized: {errMessageResponse: object , }</p>
     <p>400 bad request error: {errMessageResponse:object}</p>
     <p>422 unprocessable entity , //</p>
    
  <h2>SIGNUP endpoint</h2>
    <p>/api/auth/signup</p>
    <p>method : post</p>
    <h4>
    <h4>BODY</h4>
     <ul>
     <li> name:string :length should be between 4-100 </li>
     <li> email:string </li>
     <li>phoneNumber:string :The  telephone number. Must be full international format (E164)  that is +23350609081 or 050609081</li>
     <li>password:string : should be greater  than 8 and contain an uppercase , lowercase and a number and a symbol</li>
     <li>confirmpassword:string : match password</li>
     <li></li>
     </ul>
    </h4>
    <h4>Responses</h4>
    <p>200 created : {message:String , phoneNumber:String , resdata:{requestId:string , prefix:string}}</p>
    <p>400 bad request : {errMessage:object}</p>
    <p>401 unathorized , {errMessage:object}</p>
    <p>422 unprocessable entity , //</p>

  <h2>verify otp for mobile</h2>
  <p>/api/auth/verifymobileotp</p>
  <h4>method :POST</h4>
  <h4>body</h4>
  <p>
  otp: string  , not greater than or less than 4
  </p>
  <p>
  phoneNumber:string , user phonenumber must follow prev rules
  </p>
  <p>requestId:string , obtain from login/signup</p>
  <p>prefix:string  , same</p>
<h4>responses</h4>
<p>200 created , {user:object ,accessToken:String , refreshToken:string}</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>

<p>422 unprocessable entity ,{errMessage:object}</p>


  <h2>verify otp for web</h2>
  <h3> NOTE: refresh token  is passed in an http only cookie </h3>
  <p>/api/auth/verifyOtp</p>
    <h4>method :POST</h4>
  <h4>body</h4>
  <p>
  otp:string  , not greater than or less than 4
  </p>
  <p>
  phoneNumber:string , user phonenumber must follow prev rules
  </p>
  <p>requestId:string , obtain from login/signup</p>
  <p>prefix:string  , same</p>
<h4>responses</h4>
<p>200 created , {user:object ,accessToken:String }</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>

<p>422 unprocessable entity ,{errMessage:object}</p>


<h2>resendot endpoints</h2>
<p>/api/auth/resendotp</p>
  <h4>method :POST</h4>
<h4>BODY</h4>
<ul>
 <li>
 phoneNumber:string follow prev rules
 </li>
  <li>
  requestId:string  
 </li>
</ul>
<h4>responses</h4>
<p>200 success , {message:String , phoneNumber:String , resdata:{requestId:string , prefix:string}}</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>
<p>400 bad request error</p>
<p>422 unprocessable entity ,{errMessage:object}</p>

//sent with a refreshtoken
<h2>request accesstoken endpoint for mobile</h2>
<p>/api/auth/requestmobile<p>
<h4>method : get</h4>
<h4>Headers :</h4>
<h5> x-refresh-token : 'Bearer'+ ' ' + refreshToken</h5>
<h4>responses</h4>
 <p>401 unauthorized ,errMessage:object</p>
 <p>200 success , data:{accessToken:string}</p>


<h2>request accesstoken endpoint for web</h2>
<p>/api/auth/request<p>
<h4>method : get</h4>
<h4>responses</h4>
 <p>401 unauthorized ,errMessage:object</p>
 <p>200 success , data:{accessToken:string}</p>

//reset password whilst loggedin
<h2>Reset password</h2>
<p>/api/client/resetPassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
password:string , follow prev rules
</li>
<li>
oldPassword:string follow password rules
</li>
</ul>
<h4>responses</h4>
<p>200 success </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>

<h2>forgot password</h2>
<p>/api/auth/forgotPassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>

</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String , res:{requestId:String , prefix:string , phoneNumber:string}}} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>


<h2>verify forgot password otp</h2>
<p>/api/auth/verifypasswordotp</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>
<li>otp:string</li>
<li>requestId:string</li>
<li>prefix:string</li>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String , resdata:object, phoneNumber:string}} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>



<h2>change password</h2>
<p>/api/auth/changePassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>
<li>
password:string , follow prev rules
</li>
<li>confirmPassword:string</li>

</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String }} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>




///you cant create a user now but you can use this cred to login as agent  ::   "password":"Kwame12341.",
    "phoneNumber":"0507069806" ,
    

<h1>AGENT AUTH ENDPOINT</h1>
  <h2>Login endpoint</h2>
   <p>/api/user/auth/userlogin</p>
   <p>method :POST</p>
   <h4>BODY</h4>
     <ul>
     <li>phoneNumber:string : The  telephone number. Must be full international format (E164)  that is +23350609081 or 050609081 </li>
     <li>password:string : length should be between 8-100</li>
     </ul>
    <h4>Responses</h4>
    <p>200 created : {message:string , phoneNumber:string  ,resdata:{requestId:string , prefix:string}}</p>
    <p>401 unauthorized: {errMessageResponse: object , }</p>
     <p>400 bad request error: {errMessageResponse:object}</p>
     <p>422 unprocessable entity , //</p>
    
  
  <h2>verify otp for mobile</h2>
  <p>/api/user/auth/mobileverifyotp</p>
  <h4>method :POST</h4>
  <h4>body</h4>
  <p>
  otp: string  , not greater than or less than 4
  </p>
  <p>
  phoneNumber:string , user phonenumber must follow prev rules
  </p>
  <p>requestId:string , obtain from login/signup</p>
  <p>prefix:string  , same</p>
<h4>responses</h4>
<p>200 created , {user:object ,accessToken:String , refreshToken:string}</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>

<p>422 unprocessable entity ,{errMessage:object}</p>


  <h2>verify otp for web</h2>
  <h3> NOTE: refresh token  is passed in an http only cookie </h3>
  <p>/api/user/auth/verifyotp</p>
    <h4>method :POST</h4>
  <h4>body</h4>
  <p>
  otp:string  , not greater than or less than 4
  </p>
  <p>
  phoneNumber:string , user phonenumber must follow prev rules
  </p>
  <p>requestId:string , obtain from login/signup</p>
  <p>prefix:string  , same</p>
<h4>responses</h4>
<p>200 created , {user:object ,accessToken:String }</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>

<p>422 unprocessable entity ,{errMessage:object}</p>


<h2>resendot endpoints</h2>
<p>/api/user/auth/resendotp</p>
  <h4>method :POST</h4>
<h4>BODY</h4>
<ul>
 <li>
 phoneNumber:string follow prev rules
 </li>
  <li>
  requestId:string  
 </li>
</ul>
<h4>responses</h4>
<p>200 success , {message:String , phoneNumber:String , resdata:{requestId:string , prefix:string}}</p>
<p>401 unauthorized  ,{errMessage:obeject}</p>
<p>400 bad request error</p>
<p>422 unprocessable entity ,{errMessage:object}</p>

//sent with a refreshtoken
<h2>request accesstoken endpoint for mobile</h2>
<p>/api/user/auth/requestmobileaceess<p>
<h4>method : get</h4>
<h4>Headers :</h4>
<h5> x-refresh-token : 'Bearer'+ ' ' + refreshToken</h5>
<h4>responses</h4>
 <p>401 unauthorized ,errMessage:object</p>
 <p>200 success , data:{accessToken:string}</p>


<h2>request accesstoken endpoint for web</h2>
<p>/api/user/auth/requestaccess<p>
<h4>method : get</h4>
<h4>responses</h4>
 <p>401 unauthorized ,errMessage:object</p>
 <p>200 success , data:{accessToken:string}</p>

//reset password whilst loggedin
<h2>Reset password</h2>
<p>/api/user/auth/resetpassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
password:string , follow prev rules
</li>
<li>
oldPassword:string follow password rules
</li>
</ul>
<h4>responses</h4>
<p>200 success </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>

<h2>forgot password</h2>
<p>/api/user/auth/forgotPassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>

</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String , res:{requestId:String , prefix:string , phoneNumber:string}}} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>


<h2>verify forgot password otp</h2>
<p>/api/user/auth/verifypasswordotp</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>
<li>otp:string</li>
<li>requestId:string</li>
<li>prefix:string</li>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String , resdata:object, phoneNumber:string}} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>

<h2>change password</h2>
<p>/api/user/auth/changePassword</p>
<h4>method : post</h4>
<h4>BODY</h4>
<ul>
<li>
phoneNumber:string , follow prev rules
</li>
<li>
password:string , follow prev rules
</li>
<li>confirmPassword:string</li>

</ul>
<h4>responses</h4>
<p>200 success {success:true , data:{message:String }} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>


<h2>fetch  all clients</h2>
<p>/api/clients</p>
<h4>method : get</h4>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:object} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>

<h2>fetch  a client</h2>
<p>/api/clients/:id</p>
<h4>method : get</h4>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:object} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>


<h2>fetch  all agents</h2>
<p>/api/users/</p>
<h4>method : get</h4>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:object} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>


<h2>fetch  a agent</h2>
<p>/api/users/:id</p>
<h4>method : get</h4>
</ul>
<h4>responses</h4>
<p>200 success {success:true , data:object} </p>
<p>422 unprocessable entity , errMessage:object</p>
<p>401 unauthorized , errMessage:object</p>
<p>400 bad request </p>

