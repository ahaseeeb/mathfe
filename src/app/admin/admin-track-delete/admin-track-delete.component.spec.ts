import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackDeleteComponent } from './admin-track-delete.component';

describe('AdminTrackDeleteComponent', () => {
  let component: AdminTrackDeleteComponent;
  let fixture: ComponentFixture<AdminTrackDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
