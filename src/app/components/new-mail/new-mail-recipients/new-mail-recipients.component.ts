import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* CHARACTERS */
import { Character } from '../../../interfaces/character';
import { Recipient } from '../../../interfaces/recipient';

/* SERVICES */
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-new-mail-recipients',
  templateUrl: './new-mail-recipients.component.html',
  styleUrls: ['./new-mail-recipients.component.css']
})
export class NewMailRecipientsComponent implements OnInit {

  public recipients_1$: BehaviorSubject<any[]>;
  public recipients_2$: BehaviorSubject<any[]>;
  public hideRecipients$: BehaviorSubject<boolean>;
  public showCharacterSelection: boolean;

  @Input() recipients: Recipient[];
  @Input() sender: Character;
  @Output() recipientsChange: EventEmitter<Recipient[]> = new EventEmitter();
  @Output() hasOpenPopups: EventEmitter<boolean> = new EventEmitter( false );

  constructor(
      private characterService: CharacterService,
  ) {
    this.recipients_1$ = new BehaviorSubject( [] );
    this.recipients_2$ = new BehaviorSubject( [] );
    this.hideRecipients$ = new BehaviorSubject( false );
    this.showCharacterSelection = false;
  }

  ngOnInit() {}

  ngOnChanges() {
    // TODO: Should only respond on changes of recipients
    /* respond to changes on @Input */
    /* empty recipient_1$ and recipient_2$ */
    this.recipients_1$.next( [] );
    this.recipients_2$.next( [] );

    let firstRecipients = this.recipients.slice(0, 8);

    /* mutate the recipients to characters*/
    firstRecipients.forEach( recipient => {
      this.characterService.get_character( recipient.index )
      .subscribe( character => {
        let newRecipients_1 = this.recipients_1$.getValue();
        newRecipients_1.push( character );
        this.recipients_1$.next( newRecipients_1 );
      });
    });

    if( this.recipients.length <= 17 ){
      let secondRecipientArray = this.recipients.slice(8, 17);
      /* mutate the recipients to characters*/
      secondRecipientArray.forEach( recipient => {
        this.characterService.get_character( recipient.index )
        .subscribe( character => {
          let newRecipients_2 = this.recipients_1$.getValue();
          newRecipients_2.push( character );
          this.recipients_2$.next( newRecipients_2 );
        });
      });
      this.hideRecipients$.next( false );
    }
    if( this.recipients.length > 17 ){
      let secondRecipientArray = this.recipients.slice(8, 16);
      /* mutate the recipients to characters*/
      secondRecipientArray.forEach( recipient => {
        this.characterService.get_character( recipient.index )
        .subscribe( character => {
          let newRecipients_2 = this.recipients_1$.getValue();
          newRecipients_2.push( character );
          this.recipients_2$.next( newRecipients_2 );
        });
      });
      this.hideRecipients$.next( true );
    }
    // TODO: refactor umutating chracters to a function ( that would also handle corp, alliance in the future )
  }

  public select_recipient(): void {
    this.showCharacterSelection = true;
    this.hasOpenPopups.emit( true );
  }

  public add_recipient( characterIndex: number ){
    this.characterService.get_character( characterIndex )
    .subscribe( character => {
      // TODO: check if character already exists in array
      let recipients: Recipient[] = this.recipients.slice();
      recipients.push({
        index: character.index,
        type: 'character'});
      this.recipientsChange.emit( recipients );
      this.showCharacterSelection = true;
    });
  }

  public update_popupStatus( openPopup:boolean ){
    this.showCharacterSelection = openPopup;
    this.hasOpenPopups.emit( openPopup );
  }

  private open_recipientDetails( recipient ): void{
    // TODO: implement a recipientDetails screen / component
    alert('clicking temporarily removes the character');
    let recipients = this.recipients.filter( currentRecipient => {
      return currentRecipient.index !== recipient.index;
    });
    this.recipientsChange.emit( recipients );
  }

}
