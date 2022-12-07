import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../../../libs/data/src/lib/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3333/api/data-api/user';

  getUsers(): Observable<User[]> {
    console.log('alle users aangeroepen')

    const token = JSON.parse(localStorage.getItem('token') || '').token;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User[]>(this.url,
    {
      headers: headers,
    });
  }

  getUserById(id: string): Observable<User> {
    console.log('userid('+ id +') aangeroepen')

    const token = JSON.parse(localStorage.getItem('token') || '').token;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + `/${id}`, 
    {
      headers: headers,
    })
  }

  getLoggedInUser(): Observable<User> {
    console.log('getloggedinuser');
    
    const token = JSON.parse(localStorage.getItem('token') || '').token;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + '/loggedUser', 
      {
        headers: headers,
      });
  }

  updateUser(updatedUser: User) {
    console.log("Updating user " + updatedUser.id);  

    const token = JSON.parse(localStorage.getItem('token') || '').token;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });
    
    return this.httpClient.put<User>(this.url + `/${updatedUser.id}`, updatedUser, 
    {
      headers: headers,
    }
    );
  }

  deleteUser(userToDelete: string) {
    console.log("Delete user("+ userToDelete +")");

    const token = JSON.parse(localStorage.getItem('token') || '').token;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.delete<string>(this.url + `/${userToDelete}`, 
    {
      headers: headers,
    });
  }
}
