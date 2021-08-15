import { TestBed, inject } from '@angular/core/testing';

import { HouseTrackService } from './house-track.service';

describe('HouseTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HouseTrackService]
    });
  });

  it('should be created', inject([HouseTrackService], (service: HouseTrackService) => {
    expect(service).toBeTruthy();
  }));
});
