import { Injectable } from '@angular/core';
import { Login } from './login';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logout() {
    throw new Error('Method not implemented.');
  }
  myheaderOpt!: HttpHeaders;
  logoutHeader!: HttpHeaders;
  authChange = new Subject<boolean>();
  isLoginned!: boolean;
  constructor(private http: HttpClient) {
    this.myheaderOpt = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
  }
  login(loginForm: Login) {
    debugger;
    return this.http
      .post(
        'https://taskfrontendapi.azurewebsites.net/api/user/login',
        loginForm,
        {
          headers: this.myheaderOpt,
        }
      )
      .pipe(
        map((user) => {
          this.authChange.next(true);
          return user;
        })
      );
  }

  checkLocalStorage() {
    if (localStorage.getItem('loginToken')) {
      return true;
    } else {
      return false;
    }
  }
}
