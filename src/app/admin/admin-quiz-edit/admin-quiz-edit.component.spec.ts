import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizEditComponent } from './admin-quiz-edit.component';

describe('AdminQuizEditComponent', () => {
  let component: AdminQuizEditComponent;
  let fixture: ComponentFixture<AdminQuizEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
