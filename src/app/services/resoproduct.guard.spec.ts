import { TestBed } from '@angular/core/testing';

import { ResoproductGuard } from './resoproduct.guard';

describe('ResoproductGuard', () => {
  let guard: ResoproductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResoproductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
