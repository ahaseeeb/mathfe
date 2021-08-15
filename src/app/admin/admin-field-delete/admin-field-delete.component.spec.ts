import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldDeleteComponent } from './admin-field-delete.component';

describe('AdminFieldDeleteComponent', () => {
  let component: AdminFieldDeleteComponent;
  let fixture: ComponentFixture<AdminFieldDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFieldDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
