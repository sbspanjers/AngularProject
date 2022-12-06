import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../../libs/data/src/lib/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  userId: string | null = null;
  user: User = new User;
  editUser = new User('', '', '');
  userExists = false;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router,
) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        // Bestaande user
        this.userService.getUserById(this.userId).subscribe((user: User) => {
          this.user = user; 
          this.editUser.id = user.id;
          this.editUser.name = user.name;
          this.editUser.emailAddress = user.emailAddress;
          this.userExists = true;
        });    
      } else {
        // Nieuwe user
        this.user = new User();
      }
    });
  }

  onSubmit(): void {
    if (this.userExists) {
      console.log('submit edit user');
      this.userService.updateUser(this.editUser).subscribe((user: User) => {
        console.log(user);
      });
    }
    this.router.navigate(['users']);
  }
}
