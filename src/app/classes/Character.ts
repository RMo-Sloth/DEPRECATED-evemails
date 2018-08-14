export class Character {
  // did not supply all values because most are unecessary
  characterId: number;
  birthday: Date;
  gender: string;
  name: string;
  portraits:{
    px128x128: string,
    px256x256: string,
    px512x512: string,
    px64x64: string
  };
  corporation_id: number;
  alliance_id: number;
  unreadMails: number = 10; // TODO: refactro to mailService

  constructor( characterId ) {
    this.characterId = characterId;
  }
}
