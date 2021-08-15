import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDeleteComponent } from './skill-delete.component';

describe('SkillDeleteComponent', () => {
  let component: SkillDeleteComponent;
  let fixture: ComponentFixture<SkillDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
