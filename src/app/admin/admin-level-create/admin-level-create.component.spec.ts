import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelCreateComponent } from './admin-level-create.component';

describe('AdminLevelCreateComponent', () => {
  let component: AdminLevelCreateComponent;
  let fixture: ComponentFixture<AdminLevelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
