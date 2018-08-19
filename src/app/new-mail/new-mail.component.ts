import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../models/character.model';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  account_id: number;
  account: Character;
  navigationButtons; // TODO: add type

  constructor(
    private route: ActivatedRoute,
    public  appStateService : AppStateService,
    public userAccountService: UserAccountService
  ) {
    this.account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.account = this.userAccountService.get_account( this.account_id );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${this.account.characterId}/mails`}
    ];
  }

  ngOnInit() {
    this.appStateService.currentPageName = this.account.name;
  }

}
