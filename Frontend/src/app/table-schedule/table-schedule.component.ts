import { Component, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OpeningHoursService } from '../_services/opening-hours.service';
import { ReservationsService } from '../_services/reservations.service';
import { Reservation } from '../_models/reservation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrls: ['./table-schedule.component.css'],
})
export class TableScheduleComponent implements OnInit {
  alreadyBookedReservations: any[] = [];
  reservations: any[] = [];
  openingHour: Date;
  closingHour: Date;
  numberOfColumns;

  pickingStartDate: boolean;
  pickingEndDate: boolean;
  startRes: Reservation;
  endRes: Reservation;

  tableId: number;
  tableLabel: string;
  date: Date;
  constructor(
    public reservationsService: ReservationsService,
    public bsModalRef: BsModalRef,
    public openingHoursService: OpeningHoursService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getOpeningHours();
  }

  getArray(numberOfElements: number) {
    const array = Array(numberOfElements);
    return array;
  }

  getOpeningHours() {
    this.openingHoursService.getActualOpeningHours(this.date).subscribe(
      (actualOpeningHours) => {
        if (actualOpeningHours !== null) {
          const today = new Date();
          this.openingHour = new Date(today.toDateString() + ' ' + actualOpeningHours.start + ' UTC');
          this.closingHour = new Date(today.toDateString() + ' ' + actualOpeningHours.end + ' UTC');
          this.setTableSchedule();
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  setTableSchedule() {
    this.reservations = [];
    this.reservationsService.getAlreadyBookedReservations(this.date, this.tableId).subscribe((data) => {
      for (const d of data) {
        this.alreadyBookedReservations.push({
          start: new Date(d.start + 'Z'),
          end: new Date(d.end + 'Z'),
        });
      }
      // create empty day schedule
      for (
        let i = this.getQuartersOfTheHourFromMidnight(this.openingHour);
        i < this.getQuartersOfTheHourFromMidnight(this.closingHour);
        i++
      ) {
        const tmpdate = new Date(this.date);
        tmpdate.setMinutes(i * 15);
        const tmpdate2 = new Date(this.date);
        tmpdate2.setMinutes((i + 1) * 15);
        this.reservations.push({
          start: tmpdate,
          end: tmpdate2,
          pingPongTableId: this.tableId,
          pingPongTableLabel: this.tableLabel,
          free: true,
          tempDisabled: true,
          highlighted: false,
        });
      }
      // set reservations already passed as not avalible in schedule
      const tempDate = new Date();
      if (
        tempDate.getFullYear() === this.date.getFullYear() &&
        tempDate.getMonth() === this.date.getMonth() &&
        tempDate.getDate() === this.date.getDate()
      ) {
        for (
          let i = this.getQuartersOfTheHourFromMidnight(this.openingHour);
          i < this.getQuartersOfTheHourFromMidnight(tempDate) + 4 &&
          i < this.getQuartersOfTheHourFromMidnight(this.closingHour);
          i++
        ) {
          this.reservations[i - this.getQuartersOfTheHourFromMidnight(this.openingHour)].free = false;
        }
      }

      // set reservations already booked as not avalible in schedule
      for (const m of this.alreadyBookedReservations) {
        for (
          let i = this.getQuartersOfTheHourFromMidnight(m.start);
          i < this.getQuartersOfTheHourFromMidnight(m.end);
          i++
        ) {
          console.log(i - this.getQuartersOfTheHourFromMidnight(this.openingHour));
          this.reservations[i - this.getQuartersOfTheHourFromMidnight(this.openingHour)].free = false;
        }
      }
      // set reservations already picked by user as not avalible in schedule
      for (const m of this.reservationsService.reservationsCart) {
        if (m.pingPongTableId === this.tableId && m.start.getDate() === this.date.getDate()) {
          for (
            let i = this.getQuartersOfTheHourFromMidnight(m.start);
            i < this.getQuartersOfTheHourFromMidnight(m.end);
            i += 1
          ) {
            this.reservations[i - this.getQuartersOfTheHourFromMidnight(this.openingHour)].free = false;
          }
        }
      }
    });
  }
  getQuartersOfTheHourFromMidnight(date: Date): number {
    return date.getHours() * 4 + date.getMinutes() / 15;
  }

  addToReservationList(res: Reservation) {
    this.reservationsService.addToReservationsCart(res);
    res.free = false;
  }

  onMouseOver(res: Reservation) {
    if (this.pickingEndDate) {
      this.clearHighlightedElements();
      for (const m of this.reservations) {
        if (m.start >= this.startRes.start && m.start <= res.start) {
          m.highlighted = true;
        }
      }
    }
  }

  clearHighlightedElements() {
    for (const m of this.reservations) {
      m.highlighted = false;
    }
  }
  findFirstNotFree(start: Reservation): any {
    for (const m of this.reservations) {
      if (m.start > start.start && m.free === false) {
        return m;
      }
    }
    return null;
  }

  buttonPress(res: Reservation) {
    if (this.pickingStartDate) {
      this.startRes = res;
      this.pickingStartDate = false;
      this.pickingEndDate = true;
      const firstNotFree = this.findFirstNotFree(this.startRes);

      for (const m of this.reservations) {
        if (m.start <= this.startRes.start || (firstNotFree != null && m.start >= firstNotFree.start)) {
          m.tempDisabled = true;
        }
      }
    } else if (this.pickingEndDate) {
      this.endRes = res;
      this.finishReservation();
    }
  }
  finishReservation() {
    const reservation: Reservation = {
      id: null,
      userId: null,
      free: null,
      start: this.startRes.start,
      end: this.endRes.end,
      pingPongTableId: this.tableId,
      pingPongTableLabel: this.tableLabel,
      reservationStatus: null,
    };
    this.reservationsService.addToReservationsCart(reservation);
    for (
      let i = this.getQuartersOfTheHourFromMidnight(reservation.start);
      i < this.getQuartersOfTheHourFromMidnight(reservation.end);
      i += 15
    ) {
      this.reservations[i / 15 - this.openingHour.getHours() * 4].free = false;
    }
    this.cancelReservating();
  }
  setAllTempDisabledToFalse() {
    for (const m of this.reservations) {
      m.tempDisabled = false;
    }
  }
  setAllTempDisabledToTrue() {
    for (const m of this.reservations) {
      m.tempDisabled = true;
    }
  }

  cancelReservating() {
    this.pickingStartDate = false;
    this.clearHighlightedElements();
    this.setAllTempDisabledToTrue();
    this.pickingEndDate = false;
  }
  startReservating() {
    this.pickingStartDate = true;
    this.setAllTempDisabledToFalse();
  }
}
