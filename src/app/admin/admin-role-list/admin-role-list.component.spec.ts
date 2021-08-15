import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleListComponent } from './admin-role-list.component';

describe('AdminRoleListComponent', () => {
  let component: AdminRoleListComponent;
  let fixture: ComponentFixture<AdminRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
