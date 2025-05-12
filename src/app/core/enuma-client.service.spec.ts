import { TestBed } from '@angular/core/testing';

import { EnumaClientService } from './enuma-client.service';

describe('EnumaClientService', () => {
  let service: EnumaClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumaClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
