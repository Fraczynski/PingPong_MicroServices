import { Component, OnInit } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { ReservationsService } from '../_services/reservations.service';
import { AuthService } from '../_services/auth.service';
import { Pagination } from '../_models/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css'],
})
export class UserReservationsComponent implements OnInit {
  userReservations: Reservation[];
  reservationParams: any = {};
  pagination: Pagination;

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  resetFilters() {
    this.reservationParams.start = '';
    this.reservationParams.orderBy = 'start';
    this.reservationParams.pingPongTableId = '';
    this.getReservations();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getReservations();
  }

  ngOnInit() {
    this.reservationParams.userId = this.authService.decodedToken.nameid;
    this.reservationParams.start = '';
    this.reservationParams.orderBy = 'start';
    this.reservationParams.pingPongTableId = '';
    this.getReservations();
  }
  getReservations() {
    this.reservationService
      .getAllReservations(
        this.pagination != null ? this.pagination.currentPage : null,
        this.pagination != null ? this.pagination.itemsPerPage : null,
        this.reservationParams
      )
      .subscribe(
        (data) => {
          this.userReservations = data.results;
          this.pagination = data.pagination;
          for (const r of this.userReservations) {
            r.start = new Date(r.start);
          }
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
  cancelReservation(res: Reservation) {
    this.reservationService.cancelReservation(res).subscribe(
      () => {
        this.toastr.success('Rezerwacja anulowana pomyślnie');
        this.getReservations();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
