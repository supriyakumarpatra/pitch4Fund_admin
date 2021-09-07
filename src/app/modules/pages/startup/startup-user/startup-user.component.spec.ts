import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupUserComponent } from './startup-user.component';

describe('StartupUserComponent', () => {
  let component: StartupUserComponent;
  let fixture: ComponentFixture<StartupUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
