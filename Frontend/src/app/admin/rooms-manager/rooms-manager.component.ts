import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { RoomsService } from 'src/app/_services/rooms.service';
import { Room } from 'src/app/_models/room';
import { AuthService } from 'src/app/_services/auth.service';
import { TablesService } from 'src/app/_services/tables.service';
import { DrawRoomService } from 'src/app/_services/draw-room.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as cloneDeep from 'lodash/cloneDeep';
import { ToastrService } from 'ngx-toastr';
import { AddRoomModalComponent } from '../add-room-modal/add-room-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditRoomModalComponent } from '../edit-room-modal/edit-room-modal.component';
import { Table } from 'src/app/_models/table';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.component.html',
  styleUrls: ['./rooms-manager.component.css'],
})
export class RoomsManagerComponent implements OnInit {
  canvas: HTMLCanvasElement;
  faTimes = faTimes;

  rooms: Room[];
  currentRoom: Room;

  private tables: Table[];
  private newTables: Table[] = [];
  private deletedTablesIds: number[] = [];
  allTables: Table[];

  constructor(
    public reservationService: ReservationsService,
    public authService: AuthService,
    private toastr: ToastrService,
    private tablesService: TablesService,
    private roomsService: RoomsService,
    private drawRoomService: DrawRoomService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // its workaround, canvas.offsetWidth equals 0 even in ngAfterViewInit
    setTimeout(() => this.getRooms(), 1);
  }

  getRooms() {
    this.canvas.width = this.canvas.offsetWidth;
    this.roomsService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        if (!this.currentRoom || !this.rooms.includes(this.currentRoom)) {
          this.currentRoom = this.rooms[0];
        }
        this.getTables();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteTable(table: Table) {
    if (this.newTables.includes(table)) {
      this.newTables = this.newTables.filter((t) => t !== table);
    } else {
      this.tables = this.tables.filter((t) => t !== table);
      this.deletedTablesIds.push(table.id);
    }
    this.allTables = this.allTables.filter((t) => t !== table);
    this.draw();
  }

  addNewTable() {
    const newTable: Table = {
      id: undefined,
      label: 'Nowy',
      tableLength: 2.74,
      tableWidth: 1.525,
      verticalOrientation: true,
      x: 0,
      y: 0,
      roomId: this.currentRoom.id,
      active: true,
    };
    this.newTables.push(newTable);
    this.allTables.push(newTable);
    this.draw();
  }
  openEditRoomModal() {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.getRooms();
      }
      subscription.unsubscribe();
    });
    const initialState = {
      orginalRoom: this.currentRoom,
    };
    this.modalService.show(EditRoomModalComponent, Object.assign({ initialState }, { class: 'modal-sm' }));
  }

  openAddRoomModal() {
    const subscription = this.modalService.onHide.subscribe((reason) => {
      if (reason === null) {
        this.getRooms();
      }
      subscription.unsubscribe();
    });
    this.modalService.show(AddRoomModalComponent, Object.assign({}, { class: 'modal-sm' }));
  }

  getTables() {
    this.tablesService.getTables(this.currentRoom.id).subscribe(
      (result) => {
        this.tables = result;
        this.allTables = cloneDeep(this.tables);
        this.newTables = [];
        this.deletedTablesIds = [];
        this.draw();
      },
      (error) => this.toastr.error(error)
    );
  }

  changeCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.getTables();
  }

  draw() {
    this.drawRoomService.draw(this.canvas, this.currentRoom, this.allTables);
  }

  findChangedTables(): Table[] {
    const changedTables: Table[] = [];
    for (const table of this.allTables) {
      const orginal = this.tables.find((t) => t.id === table.id);
      if (orginal !== undefined) {
        if (
          orginal.label !== table.label ||
          orginal.verticalOrientation !== table.verticalOrientation ||
          orginal.x !== table.x ||
          orginal.y !== table.y ||
          orginal.active !== table.active
        ) {
          changedTables.push(table);
        }
      }
    }
    return changedTables;
  }

  saveTablesChanges() {
    const changedTables = this.findChangedTables();
    if (changedTables.length > 0 || this.newTables.length > 0 || this.deletedTablesIds.length > 0) {
      this.tablesService.updateTablesInRoom(this.newTables, this.deletedTablesIds, changedTables).subscribe(
        () => {
          this.toastr.success('Zmiany zapisane');
          this.getTables();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
}
