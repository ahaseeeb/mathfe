import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelListComponent } from './admin-level-list.component';

describe('AdminLevelListComponent', () => {
  let component: AdminLevelListComponent;
  let fixture: ComponentFixture<AdminLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
