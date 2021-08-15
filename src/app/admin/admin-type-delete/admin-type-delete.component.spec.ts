import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeDeleteComponent } from './admin-type-delete.component';

describe('AdminTypeDeleteComponent', () => {
  let component: AdminTypeDeleteComponent;
  let fixture: ComponentFixture<AdminTypeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
