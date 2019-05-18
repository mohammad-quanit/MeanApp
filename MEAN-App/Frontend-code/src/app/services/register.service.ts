import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registrationURL = "http://localhost:4001/api/register";
  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.registrationURL, user);
  }
}
