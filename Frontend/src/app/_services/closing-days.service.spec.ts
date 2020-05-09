/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClosingDaysService } from './closing-days.service';

describe('Service: ClosingDays', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClosingDaysService]
    });
  });

  it('should ...', inject([ClosingDaysService], (service: ClosingDaysService) => {
    expect(service).toBeTruthy();
  }));
});
