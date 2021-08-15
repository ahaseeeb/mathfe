import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitCreateComponent } from './admin-unit-create.component';

describe('AdminUnitCreateComponent', () => {
  let component: AdminUnitCreateComponent;
  let fixture: ComponentFixture<AdminUnitCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
