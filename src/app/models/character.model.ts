import {CharacterPortrait} from './character-portrait.model';

export class Character {
  characterId: number;
  birthday?: Date;
  gender?: string;
  name?: string;
  portraits?: CharacterPortrait;
  corporationId?: number;
  allianceId?: number;

  constructor(character: Character ) {
      Object.assign(<Character>this, character);
  }
}
