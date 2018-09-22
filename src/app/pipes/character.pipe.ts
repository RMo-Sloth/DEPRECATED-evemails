import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CharacterService } from '../services/character.service';

@Pipe({
  name: 'character'
})
export class CharacterPipe implements PipeTransform {

  constructor(
    private characterService: CharacterService,
  ){

  }

  transform( characterIndex: number, property: string ): BehaviorSubject<string> {
      let characterProperty = new BehaviorSubject('');
      this.characterService.get_character( characterIndex )
      .subscribe( character => {
        switch( property ) {
          case 'name':
            characterProperty.next( character.name );
            break;
          case 'corporationIndex':
            characterProperty.next( character.corporation );
            break;
          case '64x64pxPortrait':
            characterProperty.next( character.portraits.px64x64 );
            break;
          case 'px128x128Portrait':
            characterProperty.next( character.portraits.px128x128 );
            break;
          case 'px256x256Portrait':
            characterProperty.next( character.portraits.px256x256 );
            break;
          case 'px512x512Portrait':
            characterProperty.next( character.portraits.px512x512 );
            break;
        }
      });
      return characterProperty;
    });
  }

}
