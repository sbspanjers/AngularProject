import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  editUser = new User('', '', false);

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router,
) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        // Bestaande user
        this.user = this.userService.getUserById(Number(this.userId));
        this.editUser.id = this.user!.id;
        this.editUser.name = this.user!.name;
        this.editUser.emailAdress = this.user!.emailAdress;
        this.editUser.isAdult = this.user!.isAdult;
      } else {
        // Nieuwe user
        this.user = new User();
      }
    });
  }

  onSubmit(): void {
    console.log('submit edit user');
    this.userService.updateUser(this.editUser!);
    this.router.navigate(['users']);
  }
}
