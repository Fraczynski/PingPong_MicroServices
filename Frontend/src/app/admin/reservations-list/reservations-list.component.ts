import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { Reservation, ReservationStatus } from 'src/app/_models/reservation';
import { Pagination } from 'src/app/_models/pagination';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';

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
    private localeService: BsLocaleService,
    private modalService: BsModalService
  ) {}

  ReservationStatus = ReservationStatus;
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
    this.reservationParams.reservationStatus = 'Active';
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
            r.start = new Date(r.start + 'Z');
            r.end = new Date(r.end + 'Z');
            r.expanded = false;
          }
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
  openAddReservationModal() {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.getReservationsList();
      }
      subscription.unsubscribe();
    });
    this.modalService.show(AddReservationModalComponent, Object.assign({}, { class: 'modal-sm' }));
  }

  markUserAbsence(res: Reservation) {
    this.reservationsService.changeReservationStatus(res, ReservationStatus.CustomerAbsence).subscribe(
      () => {
        this.toastr.info('Nieobecność klienta odnotowana.');
        this.getReservationsList();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  confirmReservation(res: Reservation) {
    this.reservationsService.changeReservationStatus(res, ReservationStatus.Convirmed).subscribe(
      () => {
        this.toastr.info('Rezerwacja potwierdzona');
        this.getReservationsList();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  cancelReservation(res: Reservation) {
    this.reservationsService.changeReservationStatus(res, ReservationStatus.Cancelled).subscribe(
      () => {
        this.toastr.info('Rezerwacja anulowana');
        this.getReservationsList();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
