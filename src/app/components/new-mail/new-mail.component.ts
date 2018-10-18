import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* INTERFACES */
import { Character } from '../../interfaces/character';
import { Mail } from '../../interfaces/mail';
/* SERVICES */
import { PageTitleService } from '../../services/page-title.service';
import { CharacterService } from '../../services/character.service';

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
  public type: string;

  public navigationButtons; // TODO: add type

  constructor(
    private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.type = this.route.snapshot.paramMap.get('type');
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
      console.log('reply');
        let accountIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
        console.log( accountIndex );
      break;
      default:
      console.log('default fallback (error, should redirect)');
    }
  }

  private sendMail(): void{
    alert("sending mails isn't implemented yet");
  }

}
