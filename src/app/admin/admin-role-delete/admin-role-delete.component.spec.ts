import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleDeleteComponent } from './admin-role-delete.component';

describe('AdminRoleDeleteComponent', () => {
  let component: AdminRoleDeleteComponent;
  let fixture: ComponentFixture<AdminRoleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
