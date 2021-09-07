import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStartupVerticalComponent } from './add-startup-vertical.component';

describe('AddStartupVerticalComponent', () => {
  let component: AddStartupVerticalComponent;
  let fixture: ComponentFixture<AddStartupVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStartupVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStartupVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
