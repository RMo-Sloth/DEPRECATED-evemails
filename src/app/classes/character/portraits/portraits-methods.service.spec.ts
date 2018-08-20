import { TestBed, inject } from '@angular/core/testing';

import { PortraitsMethodsService } from './portraits-methods.service';

describe('PortraitsMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortraitsMethodsService]
    });
  });

  it('should be created', inject([PortraitsMethodsService], (service: PortraitsMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
