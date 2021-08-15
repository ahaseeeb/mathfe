import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizAddComponent } from './admin-quiz-add.component';

describe('AdminAddQuizComponent', () => {
  let component: AdminQuizAddComponent;
  let fixture: ComponentFixture<AdminQuizAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
