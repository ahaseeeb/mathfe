import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassManagementSharedComponent } from './class-management-shared.component';

describe('ClassManagementSharedComponent', () => {
  let component: ClassManagementSharedComponent;
  let fixture: ComponentFixture<ClassManagementSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassManagementSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassManagementSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
