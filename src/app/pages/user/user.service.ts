import { Injectable } from '@angular/core';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly users: User[] = [
    {
      id: 1,
      name: 'Stijn Spanjers',
      emailAdress: 'sb.spanjers@gmail.com',
      isAdult: true,
    },
    {
      id: 2,
      name: 'Stan Tophoven',
      emailAdress: 'saj.tophoven@gmail.com',
      isAdult: true,
    },
    {
      id: 3,
      name: 'Thomas Quartel',
      emailAdress: 'th.quartel@gmail.com',
      isAdult: false,
    }
  ];

  constructor() { }

  getUsers(): User[] {
    console.log('alle users aangeroepen')
    return this.users;
  }

  getUserById(id: number): User {
    console.log('userid('+ id +') aangeroepen')
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(newUser: User) {
    console.log("Add user " + newUser.name);
    newUser.id = this.users.length + 1;
    this.users.push(newUser);
  }

  updateUser(updatedUser: User) {
    console.log("Updating user " + updatedUser.name);
    
    let user = this.users.find((obj) => obj.id == updatedUser.id);
    let index = this.users.indexOf(user!);
    this.users[index] = updatedUser;
  }
}
