import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldCreateComponent } from './admin-field-create.component';

describe('AdminFieldCreateComponent', () => {
  let component: AdminFieldCreateComponent;
  let fixture: ComponentFixture<AdminFieldCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFieldCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
