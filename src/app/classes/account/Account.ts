import { BehaviorSubject } from 'rxjs';

// import { Character } from '../character/Character';
import { UserTokens } from '../user-tokens/UserTokens';
// import { Mail } from '../mail/Mail';

export class Account{
  public character: any;
  public userTokens: UserTokens;
  public mails: any[] = [];
  public mails$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public unreadMails$: BehaviorSubject<number> = new BehaviorSubject(0);
  public constructor(){}
}
