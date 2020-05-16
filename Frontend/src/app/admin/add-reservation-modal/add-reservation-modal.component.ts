import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-reservation-modal',
  templateUrl: './add-reservation-modal.component.html',
  styleUrls: ['./add-reservation-modal.component.css'],
})
export class AddReservationModalComponent implements OnInit {
  reservation: Reservation = {
    start: new Date(),
    end: new Date(),
    userId: null,
    pingPongTableId: null,
    pingPongTableLabel: null,
    id: null,
    free: null,
    reservationStatus: null
  };
  date: Date = new Date();

  constructor(
    private reservationService: ReservationsService,
    private toastrService: ToastrService,
    private bsModalRef: BsModalRef
  ) {
    this.reservation.start.setHours(10);
    this.reservation.end.setHours(12);
    this.reservation.start.setMinutes(0);
    this.reservation.end.setMinutes(0);
    this.reservation.start.setSeconds(0);
    this.reservation.start.setMilliseconds(0);
    this.reservation.end.setSeconds(0);
    this.reservation.end.setMilliseconds(0);
  }

  sendReservation() {
    this.reservation.start.setDate(this.date.getDate());
    this.reservation.end.setDate(this.date.getDate());
    this.reservationService.sendReservations(this.reservation.userId, [this.reservation]).subscribe(
      (data) => {
        this.toastrService.success('Dodano rezerwacje');
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastrService.error(error);
      }
    );
  }
  ngOnInit() {}
}
