import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorUserComponent } from './investor-user.component';

describe('InvestorUserComponent', () => {
  let component: InvestorUserComponent;
  let fixture: ComponentFixture<InvestorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
