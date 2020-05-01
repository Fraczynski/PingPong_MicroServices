/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TablesService } from './tables.service';

describe('Service: Tables', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablesService]
    });
  });

  it('should ...', inject([TablesService], (service: TablesService) => {
    expect(service).toBeTruthy();
  }));
});
