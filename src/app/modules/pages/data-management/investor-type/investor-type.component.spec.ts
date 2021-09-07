import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorTypeComponent } from './investor-type.component';

describe('InvestorTypeComponent', () => {
  let component: InvestorTypeComponent;
  let fixture: ComponentFixture<InvestorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
