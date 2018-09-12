export interface Corporation {
  readonly index: number;
  readonly name: string;
  readonly alliance: number;
  readonly url: string;
  readonly icons: CorporationIcons;
}

export interface CorporationIcons {
  readonly px64x64: string;
  readonly px128x128: string;
  readonly px256x256: string;
}
