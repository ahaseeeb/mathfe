import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHouseTracksListComponent } from './admin-house-tracks-list.component';

describe('AdminHouseTracksListComponent', () => {
  let component: AdminHouseTracksListComponent;
  let fixture: ComponentFixture<AdminHouseTracksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHouseTracksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHouseTracksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
