import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Mail } from '../../classes/mail';
import { MailAccount } from '../../classes/MailAccount';
import { Mails } from '../../mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  accounts:MailAccount[] = [];
  mails: Mail[] = [];
  hasMore_Mails: boolean = true;
  hasRequested_mails: boolean = false;

  constructor() {
    let accounts = JSON.parse( localStorage.getItem('accounts') );
    accounts.forEach( account => {
      this.add_account( account.characterId, account.refreshToken );
      // TODO: add a service that obtains the mails
    });
  }
  private add_account( characterId, refreshToken ){
    // TODO: prevent creation of identical characters
    let mail = new MailAccount( characterId, refreshToken );
    this.accounts.push( mail );
  }
  get_account( characterId ){
    for(let i=0; i<this.accounts.length; i++){
      return this.accounts[i];
    }
  }
  getMails(): Observable<Mail[]> {
    if( this.hasRequested_mails === false ){
      this.get50Mails()
    }
    return of(this.mails)
  }
  private addMail( mail ):void{
    this.mails.push( mail );
  }
  get50Mails(): void {
    // request mails
    // use lastmailIndex to request more mails
    let mails = Mails;
    mails = mails.map( mail => {
      return new Mail(
        '<p>Hello this is a default added Text. Please update!!!</p>',
        mail.from,
        mail.is_read,
        mail.labels,
        mail.mail_id,
        mail.recipients,
        mail.subject,
        mail.timestamp
      );
    });
    // if less than 50 mails are received set hasMore_Mails to false
    if( mails.length < 50 ){ // untested
      this.hasMore_Mails = false;
    }
    // add all new mails to the array
    mails.forEach( mail => {
      this.addMail( mail );
    });
    // tell the MailService one or more mailrequests have been received
    this.hasRequested_mails = true;
    // if all mails have been received set unloaded mails to false
  }
  public getMail( mailId: number ){
    let foundMail = this.mails.find( mail => {
      return mailId === mail.mail_id;
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
