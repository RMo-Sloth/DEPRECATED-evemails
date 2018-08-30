import { BehaviorSubject } from 'rxjs';

import { Character } from '../character/Character';
import { UserTokens } from '../user-tokens/UserTokens';
import { Mail } from '../mail/Mail';

export class Account{
  public character: Character;
  public userTokens: UserTokens;
  public mails: Mail[] = [];
  public mails$: BehaviorSubject<Mail[]> = new BehaviorSubject([]);
  public unreadMails$: BehaviorSubject<number> = new BehaviorSubject(0);
  public constructor(){}
}
