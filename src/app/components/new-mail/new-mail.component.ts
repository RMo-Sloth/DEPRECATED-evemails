import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/* INTERFACES */

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
  public sender;
  public navigationButtons; // TODO: add type
  public hideRecipients$: BehaviorSubject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.hideRecipients$ = new BehaviorSubject( false );
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
  }

  private sendMail(): void{
    alert("sending mails isn't implemented yet");
  }

}
