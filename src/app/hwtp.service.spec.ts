import { TestBed } from '@angular/core/testing';

import { HWTPService } from './hwtp.service';

describe('HWTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HWTPService = TestBed.get(HWTPService);
    expect(service).toBeTruthy();
  });
});
