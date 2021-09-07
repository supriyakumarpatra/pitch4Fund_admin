import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeZoneComponent } from './add-time-zone.component';

describe('AddTimeZoneComponent', () => {
  let component: AddTimeZoneComponent;
  let fixture: ComponentFixture<AddTimeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
