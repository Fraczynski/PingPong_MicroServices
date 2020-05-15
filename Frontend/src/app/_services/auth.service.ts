import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  gatewayUrl = environment.gatewayUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.gatewayUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  editUserRole(id: number, newRoleName: string) {
    return this.http.put(this.gatewayUrl + 'auth/' + id, { name: newRoleName });
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.gatewayUrl + 'auth/roles');
  }

  register(model: any) {
    return this.http.post(this.gatewayUrl + 'auth/register', model);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  roleMatch(allowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
