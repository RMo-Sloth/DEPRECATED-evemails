import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Mail } from './Mail';
import { Account } from '../account/Account';

import { CharactersService } from '../../services/characters/characters.service';
import { UserTokenMethodsService } from '../user-tokens/user-tokens-methods.service';

@Injectable({
  providedIn: 'root'
})
export class MailMethodsService {

  constructor(
    private charactersService: CharactersService,
    private http: HttpClient,
    private userTokenMethods: UserTokenMethodsService
  ) { }

  public append_mailinfo( mail: Mail, account: Account ){
    let accessToken = this.userTokenMethods.get_accessToken( account.userTokens );
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    };
    const url =
    `https://esi.evetech.net/latest/characters/${account.character.characterId}/mail/${mail.index}/?datasource=tranquility`;
    this.http.get( url, httpOptions )
      .subscribe( ( mailInfo: any ) => {
        let body = this.translateFromEveHtml( mailInfo.body ) ;
        mail.body$.next( body );
      });
  }
  public append_sender( mail:Mail ){
    mail.sender = this.charactersService.get_character( mail.senderIndex );
  }
  private append_recipient( mail: Mail ){

  }
  private translateFromEveHtml( EVE_Html: string){
    console.log( EVE_Html );
    EVE_Html = EVE_Html.replace(/<font.*?>/g, '');
    EVE_Html = EVE_Html.replace(/<\/font>/g, '');
    console.log( EVE_Html );
    return EVE_Html;
  }
}
