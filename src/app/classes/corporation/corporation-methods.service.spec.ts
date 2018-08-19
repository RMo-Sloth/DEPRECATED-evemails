import { TestBed, inject } from '@angular/core/testing';

import { CorporationMethodsService } from './corporation-methods.service';

describe('CorporationMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporationMethodsService]
    });
  });

  it('should be created', inject([CorporationMethodsService], (service: CorporationMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
