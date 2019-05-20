import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public registrationURL = "http://localhost:4001/api/register";
  public loginURL = "http://localhost:4001/api/login";

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registrationURL, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginURL, user);
  }

  loggedIn() {
    return !!localStorage.getItem('userToken');
  }

  loggedOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(["/"]);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }
}
