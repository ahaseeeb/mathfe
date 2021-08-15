import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrolmentDeleteComponent } from './admin-enrolment-delete.component';

describe('AdminEnrolmentDeleteComponent', () => {
  let component: AdminEnrolmentDeleteComponent;
  let fixture: ComponentFixture<AdminEnrolmentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnrolmentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrolmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
