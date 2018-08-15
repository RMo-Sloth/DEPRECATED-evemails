export class Character {
  // did not supply all values because most are unecessary
  characterId: number;
  birthday: Date;
  gender: string;
  name: string;
  portraits:{
    px64x64: string;
    px128x128: string;
    px256x256: string;
    px512x512: string;
  } = {
    px64x64: "http://image.eveonline.com/Character/1_64.jpg",
    px128x128: "http://image.eveonline.com/Character/1_128.jpg",
    px256x256: "http://image.eveonline.com/Character/1_256.jpg",
    px512x512: "http://image.eveonline.com/Character/1_512.jpg"
  }
  corporation_id: number;
  alliance_id: number;
  unreadMails: number = 10; // TODO: refactro to mailService

  constructor( characterId ) {
    this.characterId = characterId;
  }
}
