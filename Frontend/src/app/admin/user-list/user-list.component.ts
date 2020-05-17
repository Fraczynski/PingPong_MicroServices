import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Pagination } from 'src/app/_models/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[];
  pagination: Pagination;
  userParams: any = {};
  roles: string[] = [];

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.authService.roleMatch(['Administrator'])) {
      this.getRoles();
    }
    this.resetFilters();
  }
  getRoles() {
    this.authService.getRoles().subscribe(
      (data) => {
        this.roles.push('');
        for (const role of data) {
          this.roles.push(role.name);
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  resetFilters() {
    this.userParams.firstName = '';
    this.userParams.lastName = '';
    this.userParams.email = '';
    this.userParams.role = '';
    this.userParams.id = '';
    this.userParams.orderBy = 'id';
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.userService
      .getUsers(
        this.pagination != null ? this.pagination.currentPage : null,
        this.pagination != null ? this.pagination.itemsPerPage : null,
        this.userParams
      )
      .subscribe(
        (data) => {
          this.users = data.results;
          this.pagination = data.pagination;
          for (const user of this.users) {
            user.expanded = false;
          }
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }

  openRoleEditModal(user: User) {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.loadUsers();
      }
      subscription.unsubscribe();
    });
    this.modalService.show(
      EditRoleComponent,
      Object.assign(
        {
          initialState: { user },
        },
        { class: 'modal-sm' }
      )
    );
  }

  deleteUser(userToDelete: User) {
    this.userService.deleteUser(userToDelete.id).subscribe(
      () => {
        this.loadUsers();
        this.toastr.success('Użytkownik usunięty');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
