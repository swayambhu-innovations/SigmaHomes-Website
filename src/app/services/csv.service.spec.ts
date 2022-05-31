import { TestBed } from '@angular/core/testing';

import { CSVService } from './csv.service';

describe('CSVService', () => {
  let service: CSVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
