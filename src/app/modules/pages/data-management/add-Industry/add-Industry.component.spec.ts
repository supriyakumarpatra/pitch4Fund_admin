import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndustryComponent } from './add-Industry.component';

describe('AddDomainComponent', () => {
  let component: AddIndustryComponent;
  let fixture: ComponentFixture<AddIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
