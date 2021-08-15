import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDifficultyDeleteComponent } from './admin-difficulty-delete.component';

describe('AdminDifficultyDeleteComponent', () => {
  let component: AdminDifficultyDeleteComponent;
  let fixture: ComponentFixture<AdminDifficultyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDifficultyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDifficultyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
