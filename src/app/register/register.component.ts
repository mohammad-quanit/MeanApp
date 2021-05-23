import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationData = {}

  constructor(private _auth: RegisterService, private route: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registrationData).subscribe(res => {
      console.log('Succesfully Registered', res);
      localStorage.setItem('userToken', JSON.stringify(res));
      this.registrationData = {};
      this.route.navigate(['/special-events']);
    }, err => console.log('Registration Failed', alert(err)));
  }
}
