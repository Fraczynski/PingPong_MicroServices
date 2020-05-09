/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReservationsService } from './reservations.service';

describe('Service: Reservations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationsService]
    });
  });

  it('should ...', inject([ReservationsService], (service: ReservationsService) => {
    expect(service).toBeTruthy();
  }));
});
