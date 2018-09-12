import { BehaviorSubject } from 'rxjs';

export class CharacterPortraits {
  px64x64$: BehaviorSubject<string> = new BehaviorSubject( 'http://image.eveonline.com/Character/1_64.jpg' );
  px128x128$: BehaviorSubject<string> = new BehaviorSubject( 'http://image.eveonline.com/Character/1_128.jpg' );
  px256x256$: BehaviorSubject<string> = new BehaviorSubject( 'http://image.eveonline.com/Character/1_256.jpg' );
  px512x512$: BehaviorSubject<string> = new BehaviorSubject( 'http://image.eveonline.com/Character/1_512.jpg' );
  constructor() {
  }
}
