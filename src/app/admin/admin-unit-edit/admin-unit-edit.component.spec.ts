import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitEditComponent } from './admin-unit-edit.component';

describe('AdminUnitEditComponent', () => {
  let component: AdminUnitEditComponent;
  let fixture: ComponentFixture<AdminUnitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
