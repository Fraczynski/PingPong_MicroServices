import { Component, OnInit } from '@angular/core';
import { SpecialOpeningHours } from 'src/app/_models/specialOpeningHours';
import { OpeningHoursService } from 'src/app/_services/opening-hours.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-special-opening-hours-modal',
  templateUrl: './add-special-opening-hours-modal.component.html',
  styleUrls: ['./add-special-opening-hours-modal.component.css'],
})
export class AddSpecialOpeningHoursModalComponent implements OnInit {
  newSpecialOpeningHours: SpecialOpeningHours;
  constructor(
    private openingHoursService: OpeningHoursService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.newSpecialOpeningHours = {
      id: undefined,
      start: new Date(),
      end: new Date(),
      day: new Date(),
      description: '',
    };
    this.newSpecialOpeningHours.start.setSeconds(0);
    this.newSpecialOpeningHours.start.setMinutes(0);
    this.newSpecialOpeningHours.start.setHours(8);
    this.newSpecialOpeningHours.end.setSeconds(0);
    this.newSpecialOpeningHours.end.setMinutes(0);
    this.newSpecialOpeningHours.end.setHours(16);
  }

  addSpecialOpeningHours() {
    this.openingHoursService.addSpecialOpeningHours(this.newSpecialOpeningHours).subscribe(
      (data) => {
        this.toastr.success('Nowe wyjątkowe godziny otwarcia dodane');
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
