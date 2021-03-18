import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080"

  constructor(private http:HttpClient) { }


  //calling the server to generate token

  generateToken(credentials:any){
    //token generate
    return this.http.post(`${this.url}/token`,credentials);
  }

  //for user login
  loginUser(token: string){
    localStorage.setItem("token",token)
    return true;
  }

  //to check whether user is logged in or not
  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token==undefined || token==='' || token==null){
      return false;
    }
    else{
      return true;
    }
  }

  //to heck whether user is logged out or not
  logout(){
    localStorage.removeItem("token");
    return true;
  }

  //for getting token
  getToken(){
    return localStorage.getItem("token");
  }

}
