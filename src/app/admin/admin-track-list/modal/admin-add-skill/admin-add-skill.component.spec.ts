import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSkillComponent } from './admin-add-skill.component';

describe('AdminAddSkillComponent', () => {
  let component: AdminAddSkillComponent;
  let fixture: ComponentFixture<AdminAddSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
