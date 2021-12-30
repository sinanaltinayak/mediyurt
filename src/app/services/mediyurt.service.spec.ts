import { TestBed } from '@angular/core/testing';

import { MediyurtService } from './mediyurt.service';

describe('MediyurtService', () => {
  let service: MediyurtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediyurtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
