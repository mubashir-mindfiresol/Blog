import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token=this.loginService.getToken()
        let newReq:any;

        console.log("INTERCEPTOR",token);

        if(token!=null){
           newReq=req.clone({headers:req.headers.set('Authorization',`Bearer ${token}`)})

        }

        return next.handle(newReq) .pipe(
            catchError(error => {
              if (error.status === 401 || error.status === 403) {
                console.log(error.status)
              }
              return throwError(error);
            })
         );;

    }
    
}