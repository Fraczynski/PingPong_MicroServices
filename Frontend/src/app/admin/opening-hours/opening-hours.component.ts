import { Component, OnInit } from '@angular/core';
import { OpeningHours } from 'src/app/_models/openingHours';
import { OpeningHoursService } from 'src/app/_services/opening-hours.service';
import { WeekDay } from '@angular/common';
import * as cloneDeep from 'lodash/cloneDeep';
import { SpecialOpeningHours } from 'src/app/_models/SpecialOpeningHours';
import { ClosingDay } from 'src/app/_models/closingDay';
import { ClosingDaysService } from 'src/app/_services/closing-days.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSpecialOpeningHoursModalComponent } from '../add-special-opening-hours-modal/add-special-opening-hours-modal.component';
import { AddClosingDayModalComponent } from '../add-closing-day-modal/add-closing-day-modal.component';
@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css'],
})
export class OpeningHoursComponent implements OnInit {
  openingHours: OpeningHours[];
  specialOpeningHours: SpecialOpeningHours[];
  closingDays: ClosingDay[];


  tempOpeningHours: OpeningHours[];
  WeekDay = WeekDay;
  constructor(
    private openingHoursService: OpeningHoursService,
    private toastr: ToastrService,
    private closingDaysService: ClosingDaysService,
    private localeService: BsLocaleService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.localeService.use('pl');
    this.getOpeningHours();
    this.getSpecialOpeningHours();
    this.getClosingDays();
  }

  getOpeningHours() {
    this.openingHoursService.getAllOpeningHours().subscribe(
      (data) => {
        this.openingHours = data;
        // move sunday to the end of the array
        this.openingHours.push(this.openingHours.shift());
        const today = new Date();
        for (const openingHour of this.openingHours) {
          openingHour.start = new Date(today.toDateString() + ' ' + openingHour.start + ' UTC');
          openingHour.end = new Date(today.toDateString() + ' ' + openingHour.end + ' UTC');
        }
        this.tempOpeningHours = cloneDeep(this.openingHours);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  openNewSpecialOpeningHoursModal() {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.getSpecialOpeningHours();
      }
      subscription.unsubscribe();
    });
    this.modalService.show(AddSpecialOpeningHoursModalComponent, Object.assign({}, { class: 'modal-sm' }));
  }
  openNewClosingDayModal() {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.getClosingDays();
      }
      subscription.unsubscribe();
    });
    this.modalService.show(AddClosingDayModalComponent, Object.assign({}, { class: 'modal-sm' }));
  }

  getSpecialOpeningHours() {
    this.openingHoursService.getAllSpecialOpeningHours().subscribe(
      (data) => {
        this.specialOpeningHours = data;
        const today = new Date();
        for (const special of this.specialOpeningHours) {
          special.day = new Date(special.day + 'Z');
          special.start = new Date(today.toDateString() + ' ' + special.start + ' UTC');
          special.end = new Date(today.toDateString() + ' ' + special.end + ' UTC');
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getClosingDays() {
    this.closingDaysService.getAllClosingDays().subscribe(
      (data) => {
        this.closingDays = data;
        for (const closing of this.closingDays) {
          closing.day = new Date(closing.day.toString());
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteClosingDay(day: ClosingDay) {
    this.closingDaysService.deleteClosingDay(day.id).subscribe(
      () => {
        this.toastr.success('Nieczynny dzień usunięty');
        this.closingDays = this.closingDays.filter((c) => c !== day);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteSpecialOpeningHours(special: SpecialOpeningHours) {
    this.openingHoursService.deleteSpecialOpeningHours(special.id).subscribe(
      () => {
        this.toastr.success('Wyjątkowe godziny otwarcia usunięte');
        this.specialOpeningHours = this.specialOpeningHours.filter((s) => s !== special);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  submitNewOpeningHours() {
    const editedOpeningHours: OpeningHours[] = [];
    for (const opening of this.tempOpeningHours) {
      const orginal = this.openingHours.find((o) => o.dayOfWeek === opening.dayOfWeek);
      if (
        orginal.end.getTime() !== opening.end.getTime() ||
        orginal.start.getTime() !== opening.start.getTime() ||
        orginal.open !== opening.open
      ) {
        editedOpeningHours.push(opening);
      }
    }
    if (editedOpeningHours.length > 0) {
      this.openingHoursService.changeOpeningHours(editedOpeningHours).subscribe(
        () => {
          this.toastr.success('Godziny poprawnie zaaktualizowane');
          this.openingHours = cloneDeep(this.tempOpeningHours);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
}
