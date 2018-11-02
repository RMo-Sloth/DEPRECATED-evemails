import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/* INTERFACES */
import { Character } from '../../interfaces/character';
import { Mail } from '../../interfaces/mail';
import { NewMail } from '../../interfaces/new-mail';
import { Recipient } from '../../interfaces/recipient';

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
  public mail :NewMail;
  public type: string;

  public navigationButtons; // TODO: add type
  @ViewChildren('mailSubject') mailSubjectInput;

  constructor(
    private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
    private mailService: MailService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.type = this.route.snapshot.paramMap.get('type');

    this.mail = {
      subject : 'mail-subject',
      body: 'body',
      recipients: [],
    };

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
          this.mail.subject = `Re: ${mail.subject}`;
          this.mail.body = mail.body;
          this.mail.recipients = [{
            index: mail.sender,
            type: 'character'
          }];
        });
        break;
      default:
        console.log('default fallback (error, should redirect)');
    }
  }

  ngAfterViewInit() {
    if( this.mailSubjectInput.first ){
      this.mailSubjectInput.first.nativeElement.focus();
    }
    this.mailSubjectInput.changes.subscribe( () => {
      this.mailSubjectInput.first.nativeElement.focus();
    });
  }

  private sendMail(): void{
    this.mailService.send_mail( this.mail, this.accountIndex )
    .subscribe(
      succes => {
        alert('mail has been sent');
      },
      error => {
        alert('sending mail failed');
      });
  }
  public change_popupState( popupOpened: boolean ) {
    if( popupOpened === false ){
      this.mailSubjectInput.first.nativeElement.focus();
    }
  }
}
