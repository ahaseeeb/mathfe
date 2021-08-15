import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDifficultyEditComponent } from './admin-difficulty-edit.component';

describe('AdminDifficultyEditComponent', () => {
  let component: AdminDifficultyEditComponent;
  let fixture: ComponentFixture<AdminDifficultyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDifficultyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDifficultyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
