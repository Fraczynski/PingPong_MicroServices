import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { Reservation } from 'src/app/_models/reservation';
import { Pagination } from 'src/app/_models/pagination';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  reservationParams: any = {};
  constructor(
    private reservationsService: ReservationsService,
    private toastr: ToastrService,
    private localeService: BsLocaleService
  ) {}

  reservations: any[];
  pagination: Pagination;

  ngOnInit() {
    this.localeService.use('pl');
    this.resetFilters();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getReservationsList();
  }

  resetFilters() {
    this.reservationParams.pingPongTableId = '';
    this.reservationParams.userId = '';
    this.reservationParams.start = '';
    this.reservationParams.orderBy = 'start';
    this.getReservationsList();
  }

  getReservationsList() {
    this.reservationsService
      .getAllReservations(
        this.pagination != null ? this.pagination.currentPage : null,
        this.pagination != null ? this.pagination.itemsPerPage : null,
        this.reservationParams
      )
      .subscribe(
        (data) => {
          this.reservations = data.results;
          this.pagination = data.pagination;
          for (const r of this.reservations) {
            r.start = new Date(r.start);
            r.expanded = false;
          }
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }

  markUserAbsence(res: Reservation) {
    this.deleteReservation(res, false);
  }

  confirmReservation(res: Reservation) {
    this.deleteReservation(res, false);
  }

  cancelReservation(res: Reservation) {
    this.deleteReservation(res, true);
  }

  deleteReservation(res: Reservation, showDeleteConfirmation: boolean) {
    this.reservationsService.cancelReservation(res).subscribe(
      () => {
        if (showDeleteConfirmation) {
          this.toastr.info('Rezerwacja anulowana');
        }
        this.getReservationsList();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
