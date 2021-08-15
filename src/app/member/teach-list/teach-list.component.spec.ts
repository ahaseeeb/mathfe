import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachListComponent } from './teach-list.component';

describe('TeachListComponent', () => {
  let component: TeachListComponent;
  let fixture: ComponentFixture<TeachListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
