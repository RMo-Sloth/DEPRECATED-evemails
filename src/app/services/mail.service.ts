// TODO: UNTESTED!!!!

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Mail } from '../interfaces/mail';

import { AccountHttpService } from './account-http.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private mails: Mail[];
  private mails$: BehaviorSubject<Mail[]>;

  constructor(
    private http: HttpClient,
    private accountHttp: AccountHttpService,
  ) {
    this.mails = [];
    this.mails$ = new BehaviorSubject([]);
  }

  public get_mail( index: number, account: number ): Observable<Mail> {

    interface request_mailResponse{
      body: string;
      from: number;
      labels: number[];
      read: boolean;
      recipients: number[];
      subject: string;
      timestamp: string;
    }

    return new Observable( observer => {
      switch( true ) {
        case this.isCompletelyRegisteredMail( index ):
          // return mail
          let mail = this.mails.find( mail => {
            return mail.index === index;
          });
          observer.next( mail );
          observer.complete();
          break;
        case this.isRegisteredMail( index ) :
          this.request_mail( index, account )
          .subscribe(
            ( response: request_mailResponse ) => {
              let mail = this.mails.find( mail => {
                return mail.index === index;
              });
              // update the existing mail to have a body
              mail.body = this.translateFromEveHtml( response.body );
              observer.next( mail );
              observer.complete();
            },
            error => {
              // TODO: for now log errors to console
              console.error(error);
            }
          ); // end subscribe request_mail
          break;
        default:
          this.request_mail( index, account )
          .subscribe(
            ( response: request_mailResponse ) => {
              let mail = {
                index: index,
                account: account,
                labels: response.labels,
                sender: response.from,
                recipients: response.recipients,
                subject: response.subject,
                body: this.translateFromEveHtml( response.body ),
                timestamp: new Date( response.timestamp ),
                isRead: response.read,
              }
              // add a new mail to the mails[]
              this.add_mail( mail );
              // trigger refresh of the mails array
              this.mails$.next( this.mails );
              // return the new mail
              observer.next( mail );
              observer.complete();
            },
            error => {
              // TODO: for now log errors to console
              console.error(error);
            }
          ); // end subscribe request_mail
      } // end switch
    }); // end observable
  }

  public get_inboxMails( accountIndex: number ): void {
    // retreives a list of mails
    const httpOptions = this.accountHttp.get_headers( accountIndex )
    .subscribe( httpOptions => {
      this.http.get( `https://esi.evetech.net/latest/characters/${accountIndex}/mail?datasource=tranquility&labels=1`, httpOptions )
      .subscribe( ( mails: any ) => { // TODO: should check more strict than any
        // add each mail using add_mail
        // foreach doesn't work here so resorted to a for loop
        // for( let i=0; i<mails.length; i++ ) {
        mails.forEach( mailInfo => {
          let mail = {
            index: mailInfo.mail_id,
            account: accountIndex,
            labels: mailInfo.labels,
            sender: mailInfo.from,
            recipients: mailInfo.recipients,
            subject: mailInfo.subject,
            body: null,
            timestamp: new Date( mailInfo.timestamp ),
            isRead: mailInfo.is_read,
          }
          // add a new mail to the mails[]
          this.add_mail( mail );
        }); // end foreach
        this.mails$.next( this.mails );
      });
    });
  }

  private request_inboxMails( accountIndex: number ): void {

  }

  private request_mail( index: number, account: number ): Observable<any> {
    return new Observable( observer => {
      let httpHeaders = this.accountHttp.get_headers( account )
      .subscribe( httpHeaders => {
        observer.next( this.http.get( `https://esi.evetech.net/latest/characters/${account}/mail/${index}/?datasource=tranquility`, httpHeaders ) );
        observer.complete();
      });
    });
  }
  private add_mail( mail: Mail ){
    // check if the mail is added ( possible due to request delay )
    if( this.isRegisteredMail( mail.index ) === false ){
      this.mails.push( mail );
    }
    // this.mails$.next( this.mails) is performed in functions invoking add_mail
    // in order to prevent unnecessary reloading for each added mail
  }
  private isRegisteredMail( mailIndex: number ): boolean{
    return this.mails.some( mail => {
      return mail.index === mailIndex;
    });
  }
  private isCompletelyRegisteredMail( mailIndex: number ){
    return this.mails.some( mail => {
      return mail.index === mailIndex
        && mail.body !== undefined;
    });
  }
  private translateFromEveHtml( EVE_Html: string) {
    EVE_Html = EVE_Html.replace(/<font.*?>/g, '');
    EVE_Html = EVE_Html.replace(/<\/font>/g, '');
    return EVE_Html;
  }
}

// TODO: this.remove_mail()
// TODO: replace http with accountHttp.service ???
// TODO: Return mail headers ( a list of mails without body )
// TODO: update isRead property of mails
