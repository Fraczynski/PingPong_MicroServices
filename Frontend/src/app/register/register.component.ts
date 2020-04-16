import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService,public router: Router) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('zarejestrowano pomyslnie');
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
