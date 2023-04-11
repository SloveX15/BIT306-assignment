// import { Injectable } from "@angular/core";
// import { HttpClient} from "@angular/common/http";
// import { AuthData } from "../models/auth.model";
// import { Subject } from "rxjs";
// import { Router } from "@angular/router";

// @Injectable ({providedIn: 'root'})

// export class AuthService  {
// private isAuthenticated! : boolean;
// private token! : string;
// private authStatusListener = new Subject<boolean>();
// constructor(private http : HttpClient , private router : Router){}

// getToken(){
//   return this.token;
// }

// getAuthStatusListener(){
// return this.authStatusListener.asObservable();
// }
// createUser (ID:string , password : string){
//   const authData : AuthData = {ID: ID, password :password};
//   this.http.post('http://localhost:3000/api/user/signup' , authData)
//   .subscribe(response => {
//     console.log(response);

//   });
// }


// login (ID:string , password : string){
//   const authData : AuthData = {ID : ID, password :password};
//   this.http.post<{token:string}>('http://localhost:3000/api/user/login' , authData)
//   .subscribe(response => {
//     const token = response.token;
//     this.token = token;
//     if(token) {
//       this.isAuthenticated = true;
//       // emit new value after getting the token
//       this.authStatusListener.next(true);
      
//     }
//     console.log("token" , response);
//   });
// }

// logout(){
//   this.token = "";
//   this.isAuthenticated = false;
//   this.authStatusListener.next(false);
//   this.router.navigate(['/']);

// }

// }
