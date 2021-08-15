import { TestBed, inject } from '@angular/core/testing';

import { SkillTrackService } from './skill-track.service';

describe('SkillTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillTrackService]
    });
  });

  it('should be created', inject([SkillTrackService], (service: SkillTrackService) => {
    expect(service).toBeTruthy();
  }));
});
