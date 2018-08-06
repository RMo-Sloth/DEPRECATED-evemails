import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Mail } from './mail';
import { Mails } from './mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor() { }
  mails: Mail[] = [];
  hasMore_Mails: boolean = true;
  hasRequested_mails: boolean = false;
  getMails(): Observable<Mail[]> {
    if( this.hasRequested_mails === false ){
      this.get50Mails()
    }
    return of(this.mails)
  }
  private addMail( mail ):void{
    this.mails.push( mail );
  }
  get50Mails(): Observable<Mail[]> {
    // request mails
    // use lastmailIndex to request more mails
    let mails = Mails;
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
}
// TODO: how to deal with multiple accounts?
// use charindex/mails/mailindex (1235465496/mails/12) ????
// and retreive the current mails from mails.
// I don t want to complicate MailService properties
// maybe extend the mailservice class when a user is added???
// rewrite to a singleton factory?? Demands more research!! e.g: https://github.com/angular/angular.js/issues/1011
