import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterService } from '../../services/character.service';

// interfaces
import { Mail } from '../../interfaces/mail';

@Component({
  selector: 'app-mail-preview',
  templateUrl: './mail-preview.component.html',
  styleUrls: ['./mail-preview.component.css']
})
export class MailPreviewComponent implements OnInit {
  @Input() accountIndex: number;
  @Input() mail: Mail;

  private portrait$: BehaviorSubject<string>;
  private sender$: BehaviorSubject<string>;

  constructor(
    private characterService: CharacterService,
  ) {
    this.portrait$ = new BehaviorSubject('');
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
