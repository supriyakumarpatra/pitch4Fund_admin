import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStartupComponent } from './select-startup.component';

describe('SelectStartupComponent', () => {
  let component: SelectStartupComponent;
  let fixture: ComponentFixture<SelectStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
