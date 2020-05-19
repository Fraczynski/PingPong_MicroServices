import { Component, OnInit } from '@angular/core';
import { ClosingDay } from 'src/app/_models/closingDay';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClosingDaysService } from 'src/app/_services/closing-days.service';

@Component({
  selector: 'app-add-closing-day-modal',
  templateUrl: './add-closing-day-modal.component.html',
  styleUrls: ['./add-closing-day-modal.component.css'],
})
export class AddClosingDayModalComponent implements OnInit {
  newClosingDay: ClosingDay;
  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private closingDaysService: ClosingDaysService
  ) {}

  ngOnInit() {
    this.newClosingDay = {
      id: undefined,
      day: new Date(),
      description: '',
    };
  }
  addClosingDay() {
    this.closingDaysService.addClosingDay(this.newClosingDay).subscribe(
      (data) => {
        this.toastr.success('Dodano nieczynny dzień');
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
