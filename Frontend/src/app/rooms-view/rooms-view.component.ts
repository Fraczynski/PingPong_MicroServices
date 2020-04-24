import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableScheduleComponent } from '../table-schedule/table-schedule.component';
import { BsModalService, BsModalRef, BsLocaleService } from 'ngx-bootstrap';
import { Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TablesService } from '../_services/tables.service';
import { Router } from '@angular/router';
import { Room } from '../_models/room';
import { RoomsService } from '../_services/rooms.service';
import { DrawRoomService } from '../_services/draw-room.service';
import { OpeningHoursService } from '../_services/opening-hours.service';
import { WeekDay } from '@angular/common';
import { ClosingDay } from '../_models/closingDay';
import { ClosingDaysService } from '../_services/closing-days.service';

@Component({
  selector: 'app-tables',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.css']
})
export class RoomsViewComponent implements OnInit {
  canvas: HTMLCanvasElement;
  bsModalRef: BsModalRef;
  closingDays: Date[] = [];

  rooms: Room[];
  public tables: Table[];

  currentRoom: Room;
  day = new Date();
  public weekDaysWhenClosed: WeekDay[] = [];

  minDate: Date;
  maxDate: Date;

  constructor(
    private modalService: BsModalService,
    public reservationService: ReservationService,
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private tablesService: TablesService,
    private router: Router,
    private roomsService: RoomsService,
    private localeService: BsLocaleService,
    private drawRoomService: DrawRoomService,
    private openingHoursService: OpeningHoursService,
    private closingDaysService: ClosingDaysService
  ) {}

  ngOnInit() {
    this.localeService.use('pl');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 14);
    this.getWeekDaysWhenClosed();
    this.getClosingDays();
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.addEventListener(
      'click',
      e => {
        this.detectTableHit(e.offsetX, e.offsetY);
      },
      false
    );
    this.getRooms();
  }

  getClosingDays() {
    this.closingDaysService.getAllClosingDays().subscribe(
      data => {
        for (const day of data) {
          this.closingDays.push(new Date(day.day));
        }
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  getWeekDaysWhenClosed() {
    this.openingHoursService.getAllOpeningHours().subscribe(
      data => {
        for (const openingHours of data) {
          if (!openingHours.open) {
            this.weekDaysWhenClosed.push(openingHours.dayOfWeek);
          }
        }
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  getRooms() {
    this.roomsService.getRooms().subscribe(
      data => {
        this.rooms = data;
        this.currentRoom = this.rooms[0];
        this.getTables();
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  getTables() {
    this.tablesService.getTables(this.currentRoom.id).subscribe(
      result => {
        this.tables = result;
        this.draw();
      },
      error => console.error(error)
    );
  }

  changeCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.getTables();
  }

  openModal(table: Table) {
    const initialState = {
      date: new Date(this.day.toDateString()),
      tableId: table.id,
      tableLabel: table.label
    };
    this.bsModalRef = this.modalService.show(
      TableScheduleComponent,
      Object.assign(
        {
          initialState
        },
        { class: 'modal-sm' }
      )
    );
  }
  removeFromReservationList(reservation: Reservation) {
    this.reservationService.removeFromReservationsCart(reservation);
  }
  sendReservations() {
    this.reservationService
      .sendReservations()
      .subscribe(
        () => {
          this.alertifyService.success('Zarezerwowano');
          this.reservationService.reservationsCart = [];
          this.router.navigate(['/user-reservations']);
        },
        error => {
          this.alertifyService.error(error);
          this.reservationService.reservationsCart = [];
        }
      );
  }

  draw() {
    this.drawRoomService.draw(
      this.canvas,
      this.currentRoom,
      this.tables
    );
  }
  detectTableHit(x: number, y: number) {
    const scale = this.drawRoomService.getScale(this.canvas, this.currentRoom);
    let xSize: number;
    let ySize: number;
    for (const t of this.tables) {
      if (t.availableForReservations) {
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
  }
}
