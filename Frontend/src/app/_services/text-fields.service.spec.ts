/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TextFieldsService } from './text-fields.service';

describe('Service: TextFields', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextFieldsService]
    });
  });

  it('should ...', inject([TextFieldsService], (service: TextFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
