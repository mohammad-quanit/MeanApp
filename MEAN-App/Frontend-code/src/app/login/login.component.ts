import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {}
  constructor(private _auth: RegisterService, private route: Router) { }


  ngOnInit() {
  }

  loginUser() {
    // console.log(JSON.stringify(this.loginData));
    this._auth.loginUser(this.loginData).subscribe(res => {
      console.log('Succesfully Login', res);
      localStorage.setItem('userToken', JSON.stringify(res));
      this.loginData = {};
      this.route.navigate(['/special-events']);
    }, err => console.log('Login Failed!, ', alert(err.error)));
  }

}
