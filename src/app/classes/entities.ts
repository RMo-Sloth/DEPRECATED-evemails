export abstract class Entity {
}

export class Character extends Entity {
  characterId: number;
  birthday: Date;
  gender: string;
  name: string;
  portraits:{
    px64x64: string,
    px128x128: string,
    px256x256: string,
    px512x512: string
  };
  corporation_id: number;
  alliance_id: number;
}
