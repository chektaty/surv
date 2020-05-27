import { TestBed } from '@angular/core/testing';

import { ServieApiServiceService } from './servie-api-service.service';

describe('ServieApiServiceService', () => {
  let service: ServieApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServieApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
