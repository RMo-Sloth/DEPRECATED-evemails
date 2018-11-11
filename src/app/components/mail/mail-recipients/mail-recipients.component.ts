import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { CorporationService } from '../../../services/corporation.service';

/* INTERFACES */

@Component({
  selector: 'app-mail-recipients',
  templateUrl: './mail-recipients.component.html',
  styleUrls: ['./mail-recipients.component.css']
})
export class MailRecipientsComponent implements OnInit {

  public characterRecipients: any[];
  public corporationRecipients: any[];
  public account: any;

  @Input() accountIndex: number;
  @Input() recipients: any[]; // todo typecheck

  constructor(
    private characterService: CharacterService,
    private corporationService: CorporationService,
  ) {
    this.characterRecipients = [];
    this.corporationRecipients = [];
  }

  ngOnInit() {
    /* get accountInfo */
    this.characterService.get_character( this.accountIndex )
    .subscribe( character => { this.account = character });

    /* get recipientsInfo */
    let firstRecipients = this.recipients.slice( 0, 8 );
    firstRecipients.forEach( recipient => {
      switch( recipient.recipient_type ){
        case 'character':
          this.characterService.get_character( recipient.recipient_id )
          .subscribe( character => {
            this.characterRecipients.push( character );
          });
          break;
        case 'corporation':
          this.corporationService.get_corporation( recipient.recipient_id )
          .subscribe( corporation => {
            this.corporationRecipients.push( corporation );
          });
          break;
      }
    });
    // TODO: implement > 9 recipients read button
  }

}
