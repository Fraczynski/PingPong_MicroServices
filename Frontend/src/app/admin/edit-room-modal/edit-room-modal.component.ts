import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/_services/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/_models/room';
import * as cloneDeep from 'lodash/cloneDeep';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-room-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.css'],
})
export class EditRoomModalComponent implements OnInit {
  roomToEdit: Room;
  orginalRoom: Room;
  constructor(
    private toastr: ToastrService,
    private roomsService: RoomsService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.roomToEdit = cloneDeep(this.orginalRoom);
  }
  editRoom() {
    if (
      this.roomToEdit.name !== this.orginalRoom.name ||
      this.roomToEdit.roomLength !== this.orginalRoom.roomLength ||
      this.roomToEdit.roomWidth !== this.orginalRoom.roomWidth
    ) {
      this.roomsService.editRoom(this.roomToEdit).subscribe(
        () => {
          this.toastr.success('Zaaktualizowano sale');
          this.bsModalRef.hide();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
  deleteRoom() {
    this.roomsService.deleteRoom(this.orginalRoom).subscribe(
      () => {
        this.toastr.success('Usunięto sale');
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
