import { TestBed } from '@angular/core/testing';

import { BackendAuthenticationService } from './backend-authentication.service';

describe('BackendAuthenticationService', () => {
  let service: BackendAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
