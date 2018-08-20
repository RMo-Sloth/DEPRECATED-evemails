import { TestBed, inject } from '@angular/core/testing';

import { MailMethodsService } from './mail-methods.service';

describe('MailMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailMethodsService]
    });
  });

  it('should be created', inject([MailMethodsService], (service: MailMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
