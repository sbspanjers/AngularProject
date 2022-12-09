import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../../../../libs/data/src';
import { LoginModel } from '../../../../../../../libs/data/src/lib/login.model'
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: LoginModel | null = null;
  wrongLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginUser = new LoginModel();
  }

  onSubmit(): void {
    console.log('login user');
    this.authService.loginUser(this.loginUser!).subscribe((token) => {
      console.log('user logged in');
      localStorage.setItem('token', JSON.stringify(token) || '');
      this.userService.getLoggedInUser().subscribe((user: User) => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user) || '');
      });
      this.authService.loginStatus = true;
      this.router.navigate(['/recipes']);
    })
    setTimeout(() => {
      this.wrongLogin = true;
    }, 250);
  }
}
