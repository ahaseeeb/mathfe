import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelDeleteComponent } from './admin-level-delete.component';

describe('AdminLevelDeleteComponent', () => {
  let component: AdminLevelDeleteComponent;
  let fixture: ComponentFixture<AdminLevelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevelDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
