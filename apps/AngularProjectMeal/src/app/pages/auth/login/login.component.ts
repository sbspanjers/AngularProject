import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../../../../../../libs/data/src/lib/login.model'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: LoginModel | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginUser = new LoginModel();
  }

  onSubmit(): string {
    console.log('login user');
    this.authService.loginUser(this.loginUser!).subscribe((token: string) => {
      this.router.navigate(['']);
      console.log('user logged in');
      console.log(token);
      
      return token;
    })
    return 'Something went wrong';
  }
}
