import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackCreateComponent } from './admin-track-create.component';

describe('AdminTrackCreateComponent', () => {
  let component: AdminTrackCreateComponent;
  let fixture: ComponentFixture<AdminTrackCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
