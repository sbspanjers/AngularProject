import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userIsLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userLoginStatus.subscribe((nextValue) => {
      this.userIsLoggedIn = nextValue;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.loginStatus.valueOf();
  }

  logout(): void {
    this.authService.loginStatus = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
