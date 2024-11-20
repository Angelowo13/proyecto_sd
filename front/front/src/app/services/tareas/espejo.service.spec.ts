import { TestBed } from '@angular/core/testing';

import { EspejoService } from './espejo.service';

describe('EspejoService', () => {
  let service: EspejoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspejoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
