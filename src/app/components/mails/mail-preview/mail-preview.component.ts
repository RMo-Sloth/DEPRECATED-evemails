import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* SERVICES */
import { CharacterService } from '../../../services/character.service';

/* INTERFACES */
import { Mail } from '../../../interfaces/mail';

@Component({
  selector: 'app-mail-preview',
  templateUrl: './mail-preview.component.html',
  styleUrls: ['./mail-preview.component.css']
})
export class MailPreviewComponent implements OnInit {
  @Input() accountIndex: number;
  @Input() mail: Mail;
  @Input() isOdd: boolean;

  public portrait$: BehaviorSubject<string>;
  public sender$: BehaviorSubject<string>;

  constructor(
    private characterService: CharacterService,
  ) {
    this.portrait$ = new BehaviorSubject('http://image.eveonline.com/Character/1_64.jpg');
    this.sender$ = new BehaviorSubject('');
  }

  ngOnInit() {
    this.characterService.get_character( this.mail.sender )
    .subscribe( character => {
      this.portrait$.next( character.portraits.px64x64 );
      this.sender$.next( character.name );
    });
  }


}
