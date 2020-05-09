import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
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
}
