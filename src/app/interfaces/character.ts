export interface Character{
  readonly index: number;
  readonly name: string;
  readonly corporation: number;
  readonly portraits: CharacterPortraits;
}

export interface CharacterPortraits{
  readonly px512x512: string;
  readonly px256x256: string;
  readonly px128x128: string;
  readonly px64x64: string;
}
