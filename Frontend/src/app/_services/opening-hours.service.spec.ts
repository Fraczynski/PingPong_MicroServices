/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpeningHoursService } from './opening-hours.service';

describe('Service: OpeningHours', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpeningHoursService]
    });
  });

  it('should ...', inject([OpeningHoursService], (service: OpeningHoursService) => {
    expect(service).toBeTruthy();
  }));
});
