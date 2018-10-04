export interface Alliance {
  readonly index: number;
  readonly name: string;
  readonly icons: AllianceIcons;
}

export interface AllianceIcons {
  readonly px64x64: string;
  readonly px128x128: string;
}
