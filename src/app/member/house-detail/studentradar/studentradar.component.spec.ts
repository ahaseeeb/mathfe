import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentradarComponent } from './studentradar.component';

describe('StudentradarComponent', () => {
  let component: StudentradarComponent;
  let fixture: ComponentFixture<StudentradarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentradarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentradarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
