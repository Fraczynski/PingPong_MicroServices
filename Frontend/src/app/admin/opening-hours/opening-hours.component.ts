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

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css'],
})
export class OpeningHoursComponent implements OnInit {
  newSpecialOpeningHoursFormVisable = false;
  newSpecialOpeningHours: SpecialOpeningHours;
  newClosingDayFormVisable = false;
  newClosingDay: ClosingDay;
  openingHours: OpeningHours[];
  specialOpeningHours: SpecialOpeningHours[];
  closingDays: ClosingDay[];
  tempOpeningHours: OpeningHours[];
  WeekDay = WeekDay;
  constructor(
    private openingHoursService: OpeningHoursService,
    private toastr: ToastrService,
    private closingDaysService: ClosingDaysService,
    private localeService: BsLocaleService
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
        this.tempOpeningHours = cloneDeep(this.openingHours);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  openNewSpecialOpeningHoursForm() {
    this.newSpecialOpeningHoursFormVisable = true;
    this.newSpecialOpeningHours = {
      id: undefined,
      start: 0,
      end: 0,
      day: new Date(),
      description: '',
    };
  }
  openNewClosingDayForm() {
    this.newClosingDayFormVisable = true;
    this.newClosingDay = {
      id: undefined,
      day: new Date(),
      description: '',
    };
  }

  getSpecialOpeningHours() {
    this.openingHoursService.getAllSpecialOpeningHours().subscribe(
      (data) => {
        this.specialOpeningHours = data;
        for (const special of this.specialOpeningHours) {
          special.day = new Date(special.day.toString());
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

  addClosingDay() {
    this.closingDaysService.addClosingDay(this.newClosingDay).subscribe((data) => {
      this.toastr.success('Dodano nieczynny dzień');
      data.day = new Date(data.day);
      this.closingDays.push(data);
      this.newClosingDayFormVisable = false;
    });
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

  addSpecialOpeningHours() {
    this.openingHoursService.addSpecialOpeningHours(this.newSpecialOpeningHours).subscribe(
      (data) => {
        this.toastr.success('Nowe wyjątkowe godziny otwarcia dodane');
        data.day = new Date(data.day);
        this.specialOpeningHours.push(data);
        this.newSpecialOpeningHoursFormVisable = false;
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
      if (orginal.end !== opening.end || orginal.start !== opening.start || orginal.open !== opening.open) {
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
