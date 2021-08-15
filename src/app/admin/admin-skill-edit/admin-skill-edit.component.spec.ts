import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillEditComponent } from './admin-skill-edit.component';

describe('AdminSkillEditComponent', () => {
  let component: AdminSkillEditComponent;
  let fixture: ComponentFixture<AdminSkillEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkillEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
