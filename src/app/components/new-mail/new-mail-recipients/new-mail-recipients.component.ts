import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* CHARACTERS */
import { Character } from '../../../interfaces/character';

/* SERVICES */
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-new-mail-recipients',
  templateUrl: './new-mail-recipients.component.html',
  styleUrls: ['./new-mail-recipients.component.css']
})
export class NewMailRecipientsComponent implements OnInit {

  constructor(
      private characterService: CharacterService,
  ) {
    this.recipients$ = new BehaviorSubject( [] );
    this.recipients_1$ = new BehaviorSubject( [] );
    this.recipients_2$ = new BehaviorSubject( [] );
    this.hideRecipients$ = new BehaviorSubject( false );
  }
  @Input() recipientsIndexes: number[];
  @Output() recipientsOutput: EventEmitter<number[]> = new EventEmitter();
  public recipients$: BehaviorSubject<Character[]>;
  public recipients_1$: BehaviorSubject<Character[]>;
  public recipients_2$: BehaviorSubject<Character[]>;
  public hideRecipients$: BehaviorSubject<boolean>;

  ngOnInit() {
    /* recipients_1$, recipients_2$ and hideRecipients$ are generated from recipients$ */
    this.recipients$.subscribe( recipients => {
      let firstRecipientArray = recipients.slice(0, 8);
      this.recipients_1$.next( firstRecipientArray );

      if( recipients.length <= 17 ){
        let secondRecipientArray = recipients.slice(8, 17);
        this.recipients_2$.next( secondRecipientArray );
        this.hideRecipients$.next( false );
      }
      if( recipients.length > 17 ){
        let secondRecipientArray = recipients.slice(8, 16);
        this.recipients_2$.next( secondRecipientArray );
        this.hideRecipients$.next( true );
      }
    });

  }

  ngOnChanges() { /* respond to changes on @Input */
    this.recipientsIndexes.forEach( recipientIndex => {
      this.recipients$.next( [] );
      this.characterService.get_character( recipientIndex )
      .subscribe( character => {
        let recipients = this.recipients$.getValue();
        // TODO: check if character already exists in array
        recipients.push( character );
        this.recipients$.next( recipients );
      });
    });
    if( this.recipientsIndexes.length === 0 ){
      this.recipients$.next( [] );
    }
    console.log('Input changed');
  }

  private select_recipient(): void {
    // TODO: implement recipient search function
    alert('opening the window to select a recipient has not been implemented yet, but it adds a recipient instead');
    this.characterService.get_character( 2114493768 )
    .subscribe( character => {
      let recipients = this.recipients$.getValue();
      // TODO: check if character already exists in array
      recipients.push( character );
      this.recipients$.next( recipients );
      this.recipientsIndexes.push( character.index );
      this.recipientsOutput.emit( this.recipientsIndexes );
    });
  }
  private open_recipientDetails( recipient ): void{
    // TODO: implement a recipientDetails screen / component
    alert('clicking temporarily removes the character');
    // TEMP: remove on click
    // let recipients = this.recipients$.getValue();
    // recipients = recipients.filter( currentRecipient => {
    //   return currentRecipient.index !== recipient.index;
    // });
    // this.recipients$.next( recipients );
    //
    let recipientsIndexes = this.recipientsIndexes.filter( currentRecipientIndex => {
      return currentRecipientIndex !== recipient.index;
    });
    this.recipientsOutput.emit( recipientsIndexes );
  }

}
