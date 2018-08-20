export class Corporation {
  index: number;
  name: string = '';
  icons:{
    px64x64: string;
    px128x128: string;
  } = {
    px64x64: "http://image.eveonline.com/Alliance/1_64.png",
    px128x128: "http://image.eveonline.com/Alliance/1_128.png"
  }
  constructor( allianceId ) {
    this.index = allianceId;
  }
}
