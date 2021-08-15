import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizDeleteComponent } from './admin-quiz-delete.component';

describe('AdminQuizDeleteComponent', () => {
  let component: AdminQuizDeleteComponent;
  let fixture: ComponentFixture<AdminQuizDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
