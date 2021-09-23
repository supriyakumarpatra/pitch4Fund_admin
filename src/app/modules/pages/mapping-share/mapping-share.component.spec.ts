import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingShareComponent } from './mapping-share.component';

describe('MappingShareComponent', () => {
  let component: MappingShareComponent;
  let fixture: ComponentFixture<MappingShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
