import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDeleteComponent } from './track-delete.component';

describe('TrackDeleteComponent', () => {
  let component: TrackDeleteComponent;
  let fixture: ComponentFixture<TrackDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
