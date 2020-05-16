import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TablesService } from '../_services/tables.service';
import { Room } from '../_models/room';
import { RoomsService } from '../_services/rooms.service';
import { DrawRoomService } from '../_services/draw-room.service';
import { OpeningHoursService } from '../_services/opening-hours.service';
import { ClosingDaysService } from '../_services/closing-days.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WeekDay } from '@angular/common';
import { TableScheduleComponent } from '../table-schedule/table-schedule.component';
import { ReservationsService } from '../_services/reservations.service';
import { Reservation } from '../_models/reservation';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tables',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.css'],
})
export class RoomsViewComponent implements OnInit {
  canvas: HTMLCanvasElement;

  bsModalRef: BsModalRef;
  closingDays: Date[] = [];
  public weekDaysWhenClosed: WeekDay[] = [];

  rooms: Room[];
  public tables: Table[];

  currentRoom: Room;
  day = new Date();

  minDate: Date;
  maxDate: Date;

  constructor(
    private tablesService: TablesService,
    private modalService: BsModalService,
    private roomsService: RoomsService,
    private localeService: BsLocaleService,
    private drawRoomService: DrawRoomService,
    private openingHoursService: OpeningHoursService,
    private closingDaysService: ClosingDaysService,
    public reservationService: ReservationsService,
    private router: Router,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.localeService.use('pl');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 14);
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.getWeekDaysWhenClosed();
    this.canvas.addEventListener(
      'click',
      (e) => {
        this.detectTableHit(e.offsetX, e.offsetY);
      },
      false
    );
    this.getRooms();
  }
  moveToTheFirstOpenDay() {
    while (this.weekDaysWhenClosed.includes(this.day.getDay()) || this.closingDays.includes(this.day)) {
      this.day.setDate(this.day.getDate() + 1);
    }
    this.day = new Date(this.day.toDateString()); // Setdate do not trigger datepicker update for some reason
  }

  getRooms() {
    this.roomsService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        this.currentRoom = this.rooms[0];
        this.getTables();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getTables() {
    this.tablesService.getTables(this.currentRoom.id).subscribe(
      (result) => {
        this.tables = result;
        this.draw();
      },
      (error) => this.toastr.error(error)
    );
  }
  getClosingDays() {
    this.closingDaysService.getAllClosingDays().subscribe(
      (data) => {
        for (const day of data) {
          this.closingDays.push(new Date(day.day));
        }
        this.moveToTheFirstOpenDay();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getWeekDaysWhenClosed() {
    this.openingHoursService.getAllOpeningHours().subscribe(
      (data) => {
        for (const openingHours of data) {
          if (!openingHours.open) {
            this.weekDaysWhenClosed.push(openingHours.dayOfWeek);
          }
        }
        this.getClosingDays();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  openModal(table: Table) {
    // -------- recomendations --------
    // number of columns 1 - modal-sm
    // number of columns 2
    // number of columns 4 - modal-lg
    const numberOfColumns = 2;
    const modalClass = 'modal-sm';

    const initialState = {
      date: new Date(this.day.toDateString()),
      tableId: table.id,
      tableLabel: table.label,
      numberOfColumns: 2,
    };
    this.bsModalRef = this.modalService.show(
      TableScheduleComponent,
      Object.assign(
        {
          initialState,
        },
        { class: modalClass }
      )
    );
  }
  removeFromReservationList(reservation: Reservation) {
    this.reservationService.removeFromReservationsCart(reservation);
  }
  sendReservations() {
    this.reservationService
      .sendReservations(this.authService.decodedToken.nameid, this.reservationService.reservationsCart)
      .subscribe(
        () => {
          this.toastr.success('Zarezerwowano');
          this.reservationService.reservationsCart = [];
          this.router.navigate(['/user-reservations']);
        },
        (error) => {
          this.toastr.error(error);
          this.reservationService.reservationsCart = [];
        }
      );
  }
  detectTableHit(x: number, y: number) {
    const scale = this.drawRoomService.getScale(this.canvas, this.currentRoom);
    let xSize: number;
    let ySize: number;
    for (const t of this.tables) {
      if (t.verticalOrientation) {
        xSize = t.tableWidth;
        ySize = t.tableLength;
      } else {
        xSize = t.tableLength;
        ySize = t.tableWidth;
      }
      xSize *= scale;
      ySize *= scale;
      if (x > t.x * scale && x < t.x * scale + xSize) {
        if (y > t.y * scale && y < t.y * scale + ySize) {
          this.openModal(t);
        }
      }
    }
  }

  changeCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.getTables();
  }
  draw() {
    this.drawRoomService.draw(this.canvas, this.currentRoom, this.tables);
  }
}
