import { TestBed } from '@angular/core/testing';

import { XutilitiesService } from './xutilities.service';

describe('XutilitiesService', () => {
  let service: XutilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XutilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
