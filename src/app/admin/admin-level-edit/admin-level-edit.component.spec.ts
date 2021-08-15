import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelEditComponent } from './admin-level-edit.component';

describe('AdminLevelEditComponent', () => {
  let component: AdminLevelEditComponent;
  let fixture: ComponentFixture<AdminLevelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
