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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((output: string) => {
      console.log(output);
      this.ngOnInit();
    });
  }
}
