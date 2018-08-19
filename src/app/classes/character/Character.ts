import { CharacterPortraits } from './portraits/Character-portraits';

export class Character {
  // did not supply all values because most are unecessary
  characterId: number;
  birthday: Date;
  gender: string;
  name: string = '';
  portraits: CharacterPortraits;
  corporation_id: number;
  // TODO: corporation
  alliance_id: number;
  // TODO: alliance, maybe get from corporation inteface?

  constructor( characterId ) {
    this.characterId = characterId;
    this.portraits = new CharacterPortraits();
  }
}
