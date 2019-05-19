import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public registrationURL = "http://localhost:4001/api/register";
  public loginURL = "http://localhost:4001/api/login";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.registrationURL, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginURL, user);
  }
}
