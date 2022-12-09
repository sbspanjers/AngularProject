import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../../../../libs/data/src/lib/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isTheUserId: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.isTheUserId = JSON.parse(localStorage.getItem('user')||'').id;
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((output: string) => {
      console.log(output);
      this.ngOnInit();
    });
  }
}
