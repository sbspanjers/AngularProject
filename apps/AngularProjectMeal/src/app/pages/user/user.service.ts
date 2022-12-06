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

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  })

  getUsers(): Observable<User[]> {
    console.log('alle users aangeroepen')
    return this.httpClient.get<User[]>(this.url,
      {
        headers: this.headers,
      }
    )
  }

  getUserById(id: string): Observable<User> {
    console.log('userid('+ id +') aangeroepen')
    return this.httpClient.get<User>(this.url + `/${id}`, 
    {
      headers: this.headers,
    })
  }

  updateUser(updatedUser: User) {
    console.log("Updating user " + updatedUser.id);  
    
    return this.httpClient.put<User>(this.url + `/${updatedUser.id}`, updatedUser, 
    {
      headers: this.headers,
    }
    );
  }

  deleteUser(userToDelete: string) {
    console.log("Delete user("+ userToDelete +")");

    return this.httpClient.delete<string>(this.url + `/${userToDelete}`, 
    {
      headers: this.headers,
    });
  }
}
