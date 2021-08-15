import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleEditComponent } from './admin-role-edit.component';

describe('AdminRoleEditComponent', () => {
  let component: AdminRoleEditComponent;
  let fixture: ComponentFixture<AdminRoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
