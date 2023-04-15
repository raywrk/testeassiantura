import { TestBed } from '@angular/core/testing';

import { GanhadorService } from './ganhador.service';

describe('GanhadorService', () => {
  let service: GanhadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanhadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
