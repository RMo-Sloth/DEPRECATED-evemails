import { TestBed, inject } from '@angular/core/testing';

import { UserTokenMethodsService } from './user-token-methods.service';

describe('UserTokenMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTokenMethodsService]
    });
  });

  it('should be created', inject([UserTokenMethodsService], (service: UserTokenMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
