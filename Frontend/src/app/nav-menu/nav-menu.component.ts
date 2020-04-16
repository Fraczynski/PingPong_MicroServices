import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        console.log('zalogowano');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    console.log('wylogowano');
    this.router.navigate(['']);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
