import { TestBed, inject } from '@angular/core/testing';

import { CharacterMethodsService } from './character-methods.service';

describe('CharacterMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterMethodsService]
    });
  });

  it('should be created', inject([CharacterMethodsService], (service: CharacterMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
