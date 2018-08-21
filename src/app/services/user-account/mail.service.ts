import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Mail } from '../../classes/mail/Mail';
import { MailMethodsService } from '../../classes/mail/mail-methods.service';

import { MailAccount } from '../../classes/MailAccount';



// TEMP: Mails
import { Mails } from '../../mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  accounts:MailAccount[] = [];
  mails: Mail[] = [];// TEMP: mails array should be refactored into the accounts
  hasMore_Mails: boolean = true;// TEMP: should be refactored into the mailAccount
  hasRequested_mails: boolean = false;// TEMP: should be refactored in the mailAccount

  constructor(
    public mailMethods: MailMethodsService
  ) {
    let accounts = JSON.parse( localStorage.getItem('accounts') );
    accounts.forEach( account => {
      this.add_account( account.characterId );
      // TODO: add a service that obtains the mails
    });
  }
  private add_account( characterId ){
    // TODO: accounts should be created in the user-account-service
    // TODO: prevent creation of identical characters
    let mail = new MailAccount( characterId );
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
    let mockmails = Mails;
    let mails = mockmails.map( mailInfo => {
      let mail = new Mail( mailInfo.mail_id );
      this.mailMethods.append_sender( mail );
      return mail;
    });
    console.log(mails);
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
