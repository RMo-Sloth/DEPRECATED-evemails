import { Pipe, PipeTransform } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';

/* INTERFACES */
import { Recipient } from '../interfaces/recipient';

/* SERVICES */
import { CharacterService } from '../services/character.service';

@Pipe({
  name: 'isInSameCorporation'
})
export class IsInSameCorporationPipe implements PipeTransform {

  constructor(
    private characterService: CharacterService
  ){}

  transform( characterIndex: number, accountIndex: number ): Observable<boolean> {
    return new Observable( observer => {
      forkJoin(
        this.characterService.get_character( accountIndex ),
        this.characterService.get_character( characterIndex ),
      )
      .subscribe( ([account, recipient]) => {
        if( recipient.corporation === account.corporation ){
          observer.next( true );
        } else {
          observer.next( false );
        }
        observer.complete();
      });
    });
  }

}
