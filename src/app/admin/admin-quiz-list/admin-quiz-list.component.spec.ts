import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizListComponent } from './admin-quiz-list.component';

describe('AdminQuizListComponent', () => {
  let component: AdminQuizListComponent;
  let fixture: ComponentFixture<AdminQuizListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
