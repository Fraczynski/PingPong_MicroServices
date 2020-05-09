import { Component, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OpeningHoursService } from '../_services/opening-hours.service';
import { ReservationsService } from '../_services/reservations.service';
import { Reservation } from '../_models/reservation';

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrls: ['./table-schedule.component.css'],
})
export class TableScheduleComponent implements OnInit {
  alreadyBookedReservations: any[] = [];
  reservations: any[] = [];
  openingHour: number;
  closingHour: number;
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
    public openingHoursService: OpeningHoursService
  ) {}

  ngOnInit() {
    this.getOpeningHours();
  }

  getArray(numberOfElements: number) {
    const array = Array(numberOfElements);
    return array;
  }

  getOpeningHours() {
    this.openingHoursService.getSpecialOpeningHours(this.date).subscribe(
      (specialOpeningHours) => {
        if (specialOpeningHours !== null) {
          this.openingHour = specialOpeningHours.start;
          this.closingHour = specialOpeningHours.end;
          this.setTableSchedule();
        } else {
          this.openingHoursService.getOpeningHours(this.date.getDay()).subscribe(
            (regularOpeningHours) => {
              this.closingHour = regularOpeningHours.end;
              this.openingHour = regularOpeningHours.start;
              this.setTableSchedule();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setTableSchedule() {
    this.reservations = [];
    this.reservationsService.getAlreadyBookedReservations(this.date, this.tableId).subscribe((data) => {
      // dates retrived are strings so we need to convert them to Date type with "new Date(string)"
      for (const d of data) {
        this.alreadyBookedReservations.push({
          start: new Date(d.start),
          end: new Date(d.end),
        });
      }
      // create empty day schedule
      for (let i = this.openingHour * 60; i < this.closingHour * 60; i += 15) {
        const tmpdate = new Date(this.date);
        tmpdate.setMinutes(i);
        const tmpdate2 = new Date(this.date);
        tmpdate2.setMinutes(i + 15);
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
          let i = this.openingHour * 60;
          i < this.getMinutesFromMidnight(tempDate) + 2 * 60 && i < this.closingHour * 60;
          i += 15
        ) {
          this.reservations[i / 15 - this.openingHour * 4].free = false;
        }
      }

      // set reservations already booked as not avalible in schedule
      for (const m of this.alreadyBookedReservations) {
        for (let i = this.getMinutesFromMidnight(m.start); i < this.getMinutesFromMidnight(m.end); i += 15) {
          this.reservations[i / 15 - this.openingHour * 4].free = false;
        }
      }
      // set reservations already picked by user as not avalible in schedule
      for (const m of this.reservationsService.reservationsCart) {
        if (m.pingPongTableId === this.tableId && m.start.getDate() === this.date.getDate()) {
          for (let i = this.getMinutesFromMidnight(m.start); i < this.getMinutesFromMidnight(m.end); i += 15) {
            this.reservations[i / 15 - this.openingHour * 4].free = false;
          }
        }
      }
    });
  }
  getMinutesFromMidnight(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
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
        if (m.start < this.startRes.start || (firstNotFree != null && m.start >= firstNotFree.start)) {
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
    };
    this.reservationsService.addToReservationsCart(reservation);
    for (
      let i = this.getMinutesFromMidnight(reservation.start);
      i < this.getMinutesFromMidnight(reservation.end);
      i += 15
    ) {
      this.reservations[i / 15 - this.openingHour * 4].free = false;
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
