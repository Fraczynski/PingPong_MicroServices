import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../_services/photos.service';
import { OpeningHoursService } from '../_services/opening-hours.service';
import { AlertService } from '../_services/alert.service';
import { TextFieldsService } from '../_services/text-fields.service';
import { AlertType, Alert } from '../_models/alert';
import { WeekDay } from '@angular/common';
import { Photo } from '../_models/photo';
import { OpeningHours } from '../_models/openingHours';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faSortDown = faSortDown;
  faSortUp = faSortUp;
  aboutUs: string;
  contact: string;
  alertsHidden = true;
  photos: Photo[];
  alerts: any[];
  openingHours: OpeningHours[];
  AlertType = AlertType;
  WeekDay = WeekDay;
  constructor(
    private textFieldsService: TextFieldsService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private openingHoursService: OpeningHoursService,
    private photosService: PhotosService
  ) {}

  ngOnInit() {
    this.getTextFieldsContent();
    this.getAlerts();
    this.getOpeningHours();
    this.getPhotos();
  }
  getPhotos() {
    this.photosService.getPhotos().subscribe(
      (data) => {
        this.photos = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  changeAlertHiddenValue() {
    this.alertsHidden = !this.alertsHidden;
  }
  getOpeningHours() {
    this.openingHoursService.getAllOpeningHours().subscribe(
      (data) => {
        this.openingHours = data;
        // move sunday to the end of the array
        this.openingHours.push(this.openingHours.shift());
        this.openingHours = this.openingHours.filter((o) => o.open === true);
        const today = new Date();
        for (const openingHour of this.openingHours) {
          openingHour.start = new Date(today.toDateString() + ' ' + openingHour.start + ' UTC');
          openingHour.end = new Date(today.toDateString() + ' ' + openingHour.end + ' UTC');
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  addToIgnoredAlerts(alert: any) {
    let ignoredAlerts: string[] = JSON.parse(localStorage.getItem('ignoredAlerts'));
    if (ignoredAlerts === null) {
      ignoredAlerts = [];
    }
    ignoredAlerts.push(alert.id);
    localStorage.setItem('ignoredAlerts', JSON.stringify(ignoredAlerts));
    this.alerts = this.alerts.filter((a) => a.id !== alert.id);
  }
  getAlerts() {
    this.alertService.getAlerts().subscribe(
      (data) => {
        this.alerts = data;
        for (const alert of this.alerts) {
          alert.type = alert.alertType === AlertType.Information ? 'success' : 'danger';
        }
        const ignoredAlerts: string[] = JSON.parse(localStorage.getItem('ignoredAlerts'));
        if (ignoredAlerts != null) {
          this.alerts = this.alerts.filter((a) => !ignoredAlerts.includes(a.id));
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getTextFieldsContent() {
    this.textFieldsService.getTextFieldConent('AboutUs').subscribe(
      (data) => {
        this.aboutUs = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
    this.textFieldsService.getTextFieldConent('Contact').subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
