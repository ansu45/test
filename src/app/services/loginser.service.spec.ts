import { TestBed } from '@angular/core/testing';

import { LoginserService } from './loginser.service';

describe('LoginserService', () => {
  let service: LoginserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
