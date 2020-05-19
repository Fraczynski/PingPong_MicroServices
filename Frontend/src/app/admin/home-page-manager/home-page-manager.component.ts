import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from 'src/app/_models/alert';
import { TextFieldsService } from 'src/app/_services/text-fields.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/_services/alert.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page-manager',
  templateUrl: './home-page-manager.component.html',
  styleUrls: ['./home-page-manager.component.css'],
})
export class HomePageManagerComponent implements OnInit {
  AlertType = AlertType;
  alerts: Alert[];
  newAlertFormVisable = false;
  newAlert: Alert;

  faTimes = faTimes;

  newAboutUsContent: string;
  oldAboutUsContent: string;

  newContactContent: string;
  oldContactContent: string;

  constructor(
    private textFieldsService: TextFieldsService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.getTextFieldsContent();
    this.getAlerts();
  }
  showNewAlertForm() {
    this.newAlertFormVisable = true;
    this.newAlert = {
      id: undefined,
      message: '',
      alertType: AlertType.Warning,
    };
  }

  changeAlertType(index: number) {
    this.newAlert.alertType = index;
  }

  isAboutUsContentDiffrent(): boolean {
    return this.oldAboutUsContent !== this.newAboutUsContent;
  }

  isContactContentDiffrent(): boolean {
    return this.oldContactContent !== this.newContactContent;
  }

  addAlert() {
    this.alertService.addAlert(this.newAlert).subscribe(
      (data) => {
        this.toastr.success('Nowe powiadomienie dodane pomyślnie');
        this.alerts.push(data);
        this.newAlertFormVisable = false;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteAlert(alert: Alert) {
    this.alertService.removeAlert(alert.id).subscribe(
      () => {
        this.toastr.success('Powiadomienie zostało usunięte');
        this.alerts = this.alerts.filter((a) => a !== alert);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getAlerts() {
    this.alertService.getAlerts().subscribe(
      (data) => {
        this.alerts = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getTextFieldsContent() {
    this.textFieldsService.getTextFieldConent('AboutUs').subscribe(
      (data) => {
        this.oldAboutUsContent = data;
        this.newAboutUsContent = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
    this.textFieldsService.getTextFieldConent('Contact').subscribe(
      (data) => {
        this.oldContactContent = data;
        this.newContactContent = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  updateAboutUsContent() {
    this.textFieldsService.updateTextFieldConent('AboutUs', this.newAboutUsContent).subscribe(
      () => {
        this.toastr.success('Zmiany zapisane pomyślnie');
        this.oldAboutUsContent = this.newAboutUsContent;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  updateContactContent() {
    this.textFieldsService.updateTextFieldConent('Contact', this.newContactContent).subscribe(
      () => {
        this.toastr.success('Zmiany zapisane pomyślnie');
        this.oldContactContent = this.newContactContent;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
