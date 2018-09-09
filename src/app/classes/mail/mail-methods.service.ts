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

  public append_Mailinfo( mail: Mail, account: Account ){
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
        mail.body$.next( mailInfo.body );
      //   mails.forEach( receivedMail => {
      //     let mail = new Mail( receivedMail.mail_id );
      //     if( receivedMail.is_read === true ){
      //       mail.is_read = true;
      //     };
      //     mail.senderIndex = receivedMail.from;
      //     mail.sender = this.charactersService.get_character( mail.senderIndex );
      //     mail.subject = receivedMail.subject;
      //     mail.labels = receivedMail.labels;
      //     mail.timestamp = new Date( receivedMail.timestamp );
      //     this.addMail( mail, account );
    // })
      });

  }
  public append_sender( mail:Mail ){
    mail.sender = this.charactersService.get_character( mail.senderIndex );
  }
  private append_recipient( mail: Mail ){

  }
}
