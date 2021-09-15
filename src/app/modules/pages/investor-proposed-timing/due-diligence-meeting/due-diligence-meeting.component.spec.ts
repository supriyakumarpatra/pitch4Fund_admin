import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDiligenceMeetingComponent } from './due-diligence-meeting.component';

describe('DueDiligenceMeetingComponent', () => {
  let component: DueDiligenceMeetingComponent;
  let fixture: ComponentFixture<DueDiligenceMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueDiligenceMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDiligenceMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
