import { TestBed } from '@angular/core/testing';

import { CreditcarduserService } from './creditcarduser.service';

describe('CreditcarduserService', () => {
  let service: CreditcarduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditcarduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
