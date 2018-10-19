import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/* INTERFACES */
import { Character } from '../../interfaces/character';
import { Mail } from '../../interfaces/mail';

/* SERVICES */
import { PageTitleService } from '../../services/page-title.service';
import { CharacterService } from '../../services/character.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {
  public accountIndex: number;
  public mailIndex: number;
  public sender: Character; // Character of accountIndex
  public mail: Mail; // mail of mailindex
  public recipients;
  public type: string;
  public subject$: BehaviorSubject<string>;
  public mailBody$: BehaviorSubject<string>;

  public navigationButtons; // TODO: add type

  constructor(
    private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
    private mailService: MailService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.type = this.route.snapshot.paramMap.get('type');
    this.subject$ = new BehaviorSubject( '' );
    this.mailBody$ = new BehaviorSubject( '' );
    this.recipients = [];
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${this.accountIndex}/mails`}
    ];
  }

  ngOnInit() {
    this.characterService.get_character( this.accountIndex )
    .subscribe( character => {
      this.sender = character;
      this.pageTitleService.set_pageTitle( `${character.name} - new mail` );
    });
    // populate mail based on route
    switch( this.type ) {
      case 'new':
        console.log('new');
        break;
      case 'reply':
        let mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
        this.mailService.get_mail( mailIndex, this.accountIndex )
        .subscribe( mail => {
          this.subject$.next( `Re: ${mail.subject}` );
          this.mailBody$.next( mail.body );
          this.recipients = [ mail.sender ];
        });
        break;
      default:
        console.log('default fallback (error, should redirect)');
    }
  }

  private updateRecipientsArray( recipientIndexes ){
    this.recipients = recipientIndexes;
    console.log( recipientIndexes );
  }

  private sendMail(): void{
    alert("sending mails isn't implemented yet");
  }
}
// TODO: should receive array of recipients from the recipientsarray
