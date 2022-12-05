import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../../../../../libs/data/src/lib/register.model'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  newUser: RegisterModel | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.newUser = new RegisterModel();
  }

  onSubmit(): string {
    console.log('register user');
    this.authService.registerUser(this.newUser!).subscribe((id: string) => {
      this.router.navigate(['']);
      console.log(id);
      return id;
    });
    return 'Something went wrong';
  }
}
