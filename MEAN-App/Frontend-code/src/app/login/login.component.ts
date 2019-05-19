import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {}
  constructor(private _auth: RegisterService) { }

  ngOnInit() {
  }

  loginUser() {
    // console.log(JSON.stringify(this.loginData));
    this._auth.loginUser(this.loginData).subscribe(res => {
      console.log('Succesfully Login', res);
      this.loginData = {}
    }, err => console.log('Login Failed!, ', err.error));
  }

}
