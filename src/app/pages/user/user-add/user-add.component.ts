import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  user = new User('', '', false);

  onSubmit(): void {
    console.log('submit add user');
    this.userService.addUser(this.user);
    this.router.navigate(['users']);
  }
}
