import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrolmentEditComponent } from './admin-enrolment-edit.component';

describe('AdminEnrolmentEditComponent', () => {
  let component: AdminEnrolmentEditComponent;
  let fixture: ComponentFixture<AdminEnrolmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnrolmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrolmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
