import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeEditComponent } from './admin-type-edit.component';

describe('AdminTypeEditComponent', () => {
  let component: AdminTypeEditComponent;
  let fixture: ComponentFixture<AdminTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
