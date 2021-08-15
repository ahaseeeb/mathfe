import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHouseCreateComponent } from './admin-house-create.component';

describe('AdminHouseCreateComponent', () => {
  let component: AdminHouseCreateComponent;
  let fixture: ComponentFixture<AdminHouseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHouseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
