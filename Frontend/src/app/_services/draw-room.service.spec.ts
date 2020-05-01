/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawRoomService } from './draw-room.service';

describe('Service: DrawRoom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawRoomService]
    });
  });

  it('should ...', inject([DrawRoomService], (service: DrawRoomService) => {
    expect(service).toBeTruthy();
  }));
});
