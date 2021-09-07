import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentStageComponent } from './add-investment-stage.component';

describe('AddInvestmentStageComponent', () => {
  let component: AddInvestmentStageComponent;
  let fixture: ComponentFixture<AddInvestmentStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvestmentStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvestmentStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
