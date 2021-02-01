import { TestBed } from '@angular/core/testing';

import { Myguard2Guard } from './myguard2.guard';

describe('Myguard2Guard', () => {
  let guard: Myguard2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Myguard2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
