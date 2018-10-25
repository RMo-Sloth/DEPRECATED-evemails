import { Pipe, PipeTransform } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';

/* INTERFACES */

/* SERVICES */
import { CharacterService } from '../services/character.service';
import { CorporationService } from '../services/corporation.service';

@Pipe({
  name: 'isInSameAlliance'
})
export class IsInSameAlliancePipe implements PipeTransform {

    constructor(
      private characterService: CharacterService,
      private corporationService: CorporationService,
    ){}

    transform( characterIndex: number, accountIndex: number ): Observable<boolean> {
      return new Observable( observer => {
        forkJoin(
          this.characterService.get_character( accountIndex ),
          this.characterService.get_character( characterIndex ),
        )
        .subscribe( ([account, recipient]) => {
          forkJoin(
            this.corporationService.get_corporation( account.corporation ),
            this.corporationService.get_corporation( recipient.corporation  )
          )
          .subscribe( ([account, recipient]) => {
            if( recipient.alliance === undefined ){
              observer.next( false );
            } else if( recipient.alliance === account.alliance ){
              observer.next( true );
            } else {
              observer.next( false );
            }
            observer.complete();
          })
        });
      });
    }

}
