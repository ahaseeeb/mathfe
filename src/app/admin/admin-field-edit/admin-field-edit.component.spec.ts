import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldEditComponent } from './admin-field-edit.component';

describe('AdminFieldEditComponent', () => {
  let component: AdminFieldEditComponent;
  let fixture: ComponentFixture<AdminFieldEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFieldEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
