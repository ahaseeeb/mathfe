import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitDeleteComponent } from './admin-unit-delete.component';

describe('AdminUnitDeleteComponent', () => {
  let component: AdminUnitDeleteComponent;
  let fixture: ComponentFixture<AdminUnitDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
