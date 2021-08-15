import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachDetailComponent } from './teach-detail.component';

describe('TeachDetailComponent', () => {
  let component: TeachDetailComponent;
  let fixture: ComponentFixture<TeachDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
