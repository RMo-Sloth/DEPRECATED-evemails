import { TestBed, inject } from '@angular/core/testing';

import { AllianceMethodsService } from './alliance-methods.service';

describe('AllianceMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllianceMethodsService]
    });
  });

  it('should be created', inject([AllianceMethodsService], (service: AllianceMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
