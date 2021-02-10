import { TestBed } from '@angular/core/testing';

import { MyErrorHandlerServiceService } from './my-error-handler-service.service';

describe('MyErrorHandlerServiceService', () => {
  let service: MyErrorHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyErrorHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
