import { TestBed } from '@angular/core/testing';

import { SeoTagsService } from './seo-tags.service';

describe('SeoTagsService', () => {
  let service: SeoTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
