import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPassedComponent } from './track-passed.component';

describe('TrackPassedComponent', () => {
  let component: TrackPassedComponent;
  let fixture: ComponentFixture<TrackPassedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPassedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
