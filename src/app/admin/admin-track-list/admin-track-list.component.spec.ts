import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackListComponent } from './admin-track-list.component';

describe('AdminTrackListComponent', () => {
  let component: AdminTrackListComponent;
  let fixture: ComponentFixture<AdminTrackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
