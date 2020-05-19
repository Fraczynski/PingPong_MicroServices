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
  public rolesList: any[] = [];
  constructor(private authService: AuthService, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.authService.getRoles().subscribe(
      (data) => {
        for (const role of data) {
          if (this.user.roles.includes(role.name)) {
            this.rolesList.push({ name: role.name, haveIt: true });
          } else {
            this.rolesList.push({ name: role.name, haveIt: false });
          }
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  confirmRoleChange() {
    const newUserRoles: string[] = [];

    for (const role of this.rolesList) {
      if (role.haveIt === true) {
        newUserRoles.push(role.name);
      }
    }
    this.authService.editUserRole(this.user.id, newUserRoles).subscribe(
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
