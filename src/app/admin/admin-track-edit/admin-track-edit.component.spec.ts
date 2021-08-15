import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackEditComponent } from './admin-track-edit.component';

describe('AdminTrackEditComponent', () => {
  let component: AdminTrackEditComponent;
  let fixture: ComponentFixture<AdminTrackEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
