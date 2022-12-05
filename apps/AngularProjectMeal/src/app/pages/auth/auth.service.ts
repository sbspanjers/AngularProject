import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../../../../libs/data/src';
import { LoginModel } from '../../../../../../libs/data/src/lib/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    private url = 'http://localhost:3333/api/auth-api'

    private headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    });

    registerUser(newUser: RegisterModel): Observable<string> {
      console.log('register new user');
      return this.httpClient.post<string>(this.url + '/register', newUser);
    }

    loginUser(loginUser: LoginModel): Observable<string> {
      console.log('login existing user');
      return this.httpClient.post<string>(this.url + '/login', loginUser);
    }
}
