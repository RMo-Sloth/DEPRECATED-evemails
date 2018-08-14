import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Mail } from '../../classes/mail';
import { Mails } from '../../mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  accounts: {
    characterId: number,
    mails: Mail[],
  };
  mails: Mail[] = [];
  hasMore_Mails: boolean = true;
  hasRequested_mails: boolean = false;

  constructor() { }

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
// TODO: how to deal with multiple accounts?
// use charindex/mails/mailindex (1235465496/mails/12) ????
// and retreive the current mails from mails.
// I don t want to complicate MailService properties
// maybe extend the mailservice class when a user is added???
// rewrite to a singleton factory?? Demands more research!! e.g: https://github.com/angular/angular.js/issues/1011
// TODO: check if I am using Observable right in getMails() ( probably not)
// TODO: allow server to mail to corparation or alliance ig permissions are set
