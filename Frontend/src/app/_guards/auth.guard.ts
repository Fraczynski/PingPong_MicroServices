import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.data.roles as Array<string>;

    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['']);
        this.toastr.error('Brak dostępu!');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
    this.toastr.error('Zaloguj się!');
    this.router.navigate(['']);
    return false;
  }
}
