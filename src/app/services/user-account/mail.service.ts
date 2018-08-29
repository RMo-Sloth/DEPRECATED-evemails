import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Mail } from '../../classes/mail/Mail';
import { MailMethodsService } from '../../classes/mail/mail-methods.service';
import{ Account } from '../../classes/account/Account';

import { MailAccount } from '../../classes/MailAccount';
import { CharactersService } from '../characters/characters.service';


// TEMP: Mails
import { Mails } from '../../mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    public mailMethods: MailMethodsService,
    private http: HttpClient,
    private charactersService: CharactersService
  ) {}

  getMails( account: Account ): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${account.userTokens.accessToken}`
      })
    };
    const url = `https://esi.evetech.net/latest/characters/${account.character.characterId}/mail/?datasource=tranquility`;
    this.http.get( url, httpOptions )
      .subscribe( ( mails: any ) => {
        mails.forEach( receivedMail => {
          let mail = new Mail( receivedMail.mail_id );
          if( receivedMail.is_read === true ){
            mail.is_read = true;
          };
          mail.senderIndex = receivedMail.from;
          mail.sender = this.charactersService.get_character( mail.senderIndex );
          mail.subject = receivedMail.subject;
          mail.labels = receivedMail.labels;
          mail.timestamp = new Date( receivedMail.timestamp );
          this.addMail( mail, account );
        });
      });
  }
  private addMail( mail: Mail, account: Account ):void{
    account.mails.push( mail );
    if( mail.is_read === false ){
      account.unreadMails++;
    }
  }

  // TODO: refactor to mail methods
  public getMail( account: Account, mailId: number ){
    let foundMail = account.mails.find( mail => {
      return mailId === mail.index;
    });
    if( foundMail === undefined ){
      location.href = '/dashboard';
    }
    // TODO: add logic when mail could not be found
    // options
    // request (detail) info if mail could not be found, will be async
    // load a fake message if none could be found
    // if not logged in refer to homepage with message
    return foundMail;
  }
}
// TODO: allow server to mail to corparation or alliance ig permissions are set
