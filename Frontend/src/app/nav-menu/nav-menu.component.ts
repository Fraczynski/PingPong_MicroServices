import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  faBook,
  faAddressCard,
  faUserCog,
  faSignOutAlt,
  faHome,
  faTableTennis,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  model: any = {};
  faBook = faBook;
  faAddressCard = faAddressCard;
  faUserCog = faUserCog;
  faHome = faHome;
  faTableTennis = faTableTennis;
  faSignOutAlt = faSignOutAlt;
  faChart = faChartBar;
  constructor(public authService: AuthService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.toastr.success('Zalogowano');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.toastr.info('Wylogowano');
    this.router.navigate(['']);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
