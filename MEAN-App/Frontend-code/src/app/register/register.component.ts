import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationData = {}

  constructor(private _auth: RegisterService) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registrationData).subscribe(res => {
      console.log('Succesfully Registered', res);
      this.registrationData = {}
    }, err => console.log('Registration Failed', err));
  }
}
