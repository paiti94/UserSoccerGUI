import { TestBed } from '@angular/core/testing';

import { SportsAPIService } from './sports-api.service';

describe('SportsAPIService', () => {
  let service: SportsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
