import { TestBed } from '@angular/core/testing';

import { BulkService } from './bulk.service';

describe('BulkService', () => {
  let service: BulkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
