/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddSpecialOpeningHoursModalComponent } from './add-special-opening-hours-modal.component';

describe('AddSpecialOpeningHoursModalComponent', () => {
  let component: AddSpecialOpeningHoursModalComponent;
  let fixture: ComponentFixture<AddSpecialOpeningHoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecialOpeningHoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialOpeningHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
