import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillDeleteComponent } from './admin-skill-delete.component';

describe('AdminSkillDeleteComponent', () => {
  let component: AdminSkillDeleteComponent;
  let fixture: ComponentFixture<AdminSkillDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkillDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkillDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
