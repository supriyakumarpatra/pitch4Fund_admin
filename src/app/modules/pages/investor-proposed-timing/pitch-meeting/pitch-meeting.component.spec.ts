import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchMeetingComponent } from './pitch-meeting.component';

describe('PitchMeetingComponent', () => {
  let component: PitchMeetingComponent;
  let fixture: ComponentFixture<PitchMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
