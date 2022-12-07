import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterModel } from '../../../../../../libs/data/src';
import { LoginModel } from '../../../../../../libs/data/src/lib/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoginStatus = new BehaviorSubject(localStorage.getItem('token') ? true:false);

  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3333/api/auth-api'

  registerUser(newUser: RegisterModel): Observable<string> {
    console.log('register new user');
    return this.httpClient.post<string>(this.url + '/register', newUser);
  }

  loginUser(loginUser: LoginModel): Observable<string> {
    console.log('login existing user');
    return this.httpClient.post<string>(this.url + '/login', loginUser);
  }

  get loginStatus() {
    return this.userLoginStatus.getValue();
  }

  set loginStatus(logout: boolean) {
    this.userLoginStatus.next(logout);
    if (!logout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
