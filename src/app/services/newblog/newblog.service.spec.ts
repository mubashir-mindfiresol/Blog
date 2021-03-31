import { TestBed } from '@angular/core/testing';

import { NewblogService } from './newblog.service';

describe('NewblogService', () => {
  let service: NewblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
