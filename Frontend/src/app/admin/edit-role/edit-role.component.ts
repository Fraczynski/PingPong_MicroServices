import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent implements OnInit {
  user: User;
  currentChosenRole: string;
  public rolesList: any[] = [];
  constructor(private authService: AuthService, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit() {
    this.currentChosenRole = this.user.role;
    this.getRoles();
  }

  getRoles() {
    this.authService.getRoles().subscribe(
      (data) => {
        for (const role of data) {
          this.rolesList.push(role.name);
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  changeCurrentRole(newRole: string) {
    this.currentChosenRole = newRole;
  }

  confirmRoleChange() {
    if (this.currentChosenRole !== this.user.role) {
      this.authService.editUserRole(this.user.id, this.currentChosenRole).subscribe(
        () => {
          this.bsModalRef.hide();
          this.toastr.success('Rola zaaktualizowana');
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
}
