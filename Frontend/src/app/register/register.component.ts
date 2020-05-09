import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, public router: Router, private toastr: ToastrService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.toastr.success('Zarejestrowano pomyślnie');
        this.router.navigate(['']);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
