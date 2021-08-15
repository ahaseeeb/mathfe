import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldListComponent } from './admin-field-list.component';

describe('AdminFieldListComponent', () => {
  let component: AdminFieldListComponent;
  let fixture: ComponentFixture<AdminFieldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFieldListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
