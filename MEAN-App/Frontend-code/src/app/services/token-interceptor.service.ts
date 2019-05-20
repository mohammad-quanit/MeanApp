import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: RegisterService) { }

  intercept(req, next) {
    let token = this.auth.getToken() ? JSON.parse(this.auth.getToken()).token : this.auth.getToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return next.handle(tokenizedReq);
  }
}
