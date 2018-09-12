import { CharacterPortraits } from './portraits/Character-portraits';
import { BehaviorSubject } from 'rxjs';


export class Character {
  // did not supply all values because most are unecessary
  characterId: number;
  birthday$: BehaviorSubject<Date> = new BehaviorSubject( null );
  gender$: BehaviorSubject<string> = new BehaviorSubject( null );
  name$: BehaviorSubject<string> = new BehaviorSubject('placeholder_name');
  portraits: CharacterPortraits;
  corporation_id$: BehaviorSubject<number> = new BehaviorSubject( null );
  // TODO: corporation
  alliance_id: number;
  // TODO: alliance, maybe get from corporation inteface?

  constructor( characterId ) {
    this.characterId = characterId;
    this.portraits = new CharacterPortraits();
  }
}
