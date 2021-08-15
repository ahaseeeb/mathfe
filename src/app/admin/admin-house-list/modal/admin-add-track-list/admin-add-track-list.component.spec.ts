import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTrackListComponent } from './admin-add-track-list.component';

describe('AdminAddTrackListComponent', () => {
  let component: AdminAddTrackListComponent;
  let fixture: ComponentFixture<AdminAddTrackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddTrackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddTrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
