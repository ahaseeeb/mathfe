import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledClassComponent } from './enrolled-class.component';

describe('EnrolledClassComponent', () => {
  let component: EnrolledClassComponent;
  let fixture: ComponentFixture<EnrolledClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolledClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
