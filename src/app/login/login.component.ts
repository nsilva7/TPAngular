
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email:string;
  password:string;

  constructor(public authService: AuthService) {}

  registro() {
    this.authService.registro(this.email,this.password);
    this.email = this.password = '';
    }

    login() {
      this.authService.login(this.email, this.password);
      this.email = this.password = '';
    }

    logout() {
      this.authService.logout();
    }

}
