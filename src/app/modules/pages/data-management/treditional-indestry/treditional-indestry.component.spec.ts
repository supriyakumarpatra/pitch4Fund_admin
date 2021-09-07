import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreditionalIndestryComponent } from './treditional-indestry.component';

describe('TreditionalIndestryComponent', () => {
  let component: TreditionalIndestryComponent;
  let fixture: ComponentFixture<TreditionalIndestryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreditionalIndestryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreditionalIndestryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
