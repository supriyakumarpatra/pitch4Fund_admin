import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingOfStartupToInvestorComponent } from './mapping-of-startup-to-investor.component';

describe('MappingOfStartupToInvestorComponent', () => {
  let component: MappingOfStartupToInvestorComponent;
  let fixture: ComponentFixture<MappingOfStartupToInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingOfStartupToInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingOfStartupToInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
