import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

/* INTERFACES */
import { Mail } from '../interfaces/mail';
interface LastLoadedMail {
  accountIndex: number;
  lastLoadedMail: number;
  allMailsAreLoaded$: BehaviorSubject<boolean>;
  // TODO: refactor lastLoadedMail to index
}


/* SERVICES */
import { AccountHttpService } from './account-http.service';
import { MailCounterService } from './mail-counter.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private mails: Mail[];
  /* lastLoadedMails tracks the last mails received by requesting get_mails
  NOT by requesting a single mail ( or it will potentially skip loading mails )*/
  private lastLoadedMails: LastLoadedMail[];
  public mails$: BehaviorSubject<Mail[]>;

  constructor(
    private http: HttpClient,
    private accountHttp: AccountHttpService,
    private mailCounter: MailCounterService,
  ) {
    this.mails = [];
    this.lastLoadedMails = [];
    this.mails$ = new BehaviorSubject([]);
  }

  /* SINGLE MAILS*/

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

  private request_mail( index: number, account: number ): Observable<any> {
    return new Observable( observer => {
      let httpHeaders = this.accountHttp.get_headers( account )
      .subscribe( httpHeaders => {
        this.http.get( `https://esi.evetech.net/latest/characters/${account}/mail/${index}/?datasource=tranquility`, httpHeaders )
        .subscribe( request_mailResponse => {
          observer.next( request_mailResponse );
          observer.complete();
        });
      });
    });
  }

  private translateFromEveHtml( EVE_Html: string) {
    EVE_Html = EVE_Html.replace(/<font.*?>/g, '');
    EVE_Html = EVE_Html.replace(/<\/font>/g, '');
    return EVE_Html;
  }

  /* MAIL LISTS */

  public add_moreMails( accountIndex: number ): void {
    /* retreives a list of mails */
    this.request_moreMails( accountIndex )
    .subscribe( ( mails: any ) => {
      // TODO: should check more strict than any
      // TODO: this foreach loop is duplicated
      // detect if last mail is requested
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
          isRead: (mailInfo.is_read === true) ? true : false ,
        }
        // add a new mail to the mails[]
        this.add_mail( mail );
      }); // end foreach

      if( mails.length < 50 && mails.length > 0 ) {
        let lastMailInfo = mails[ mails.length - 1 ];
        this.register_lastLoadedMail( accountIndex, lastMailInfo.mail_id, true );
        this.mails$.next( this.mails );
      } else if( mails.length === 0 ) {
        this.register_lastLoadedMail( accountIndex, null, true );
      } else if( mails.length === 50 ) {
        let lastMailInfo = mails[ mails.length - 1 ];
        this.register_lastLoadedMail( accountIndex, lastMailInfo.mail_id, false );
        this.mails$.next( this.mails );
      }
    }); // end subscribe
  }

  public get_initialMails( accountIndex ): void {
    if( this.accountHasMails( accountIndex ) === true ){
      // don't load more mails unless the user requests it
      // do refresh this.mails$ because get_initialMails() is triggering the filter
      // if this.mails$ isn't refreshed here it will possible load the data of the wrong account
      this.mails$.next( this.mails );
    } else {
      this.request_latestMails( accountIndex )
      .subscribe( ( mails: any ) => { // TODO: should check more strict than any
        // TODO: this is duplicated code (also in get_inboxmails!)
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
            isRead: (mailInfo.is_read === true) ? true : false ,
          }
          /* add a new mail to the mails[]*/
          this.add_mail( mail );
        }); // end foreach
        if( mails.length === 0 ) {
            this.register_lastLoadedMail( accountIndex, null, true );
        } else if( mails.length < 50 ) {
          let lastMailInfo = mails[ mails.length - 1 ];
          this.register_lastLoadedMail( accountIndex, lastMailInfo.mail_id, true );
        } else if( mails.length === 50) {
          let lastMailInfo = mails[ mails.length - 1 ];
          this.register_lastLoadedMail( accountIndex, lastMailInfo.mail_id, false );
        }
        this.mails$.next( this.mails );
      }); // end subscribe

    }
  }

  public get_latestMails( accountIndex: number ) {
    this.request_latestMails( accountIndex )
    .subscribe( ( mails: any ) => { // TODO: should check more strict than any
      // TODO: this is duplicated code
      console.log('mails requested')
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
          isRead: (mailInfo.is_read === true) ? true : false ,
        }
        /* add a new mail to the mails[]*/
        this.add_mail( mail );
      }); // end foreach
      this.mails$.next( this.mails );
    });
  }

  private accountHasMails( accountIndex ): boolean {
    return this.mails.some( mail => mail.account === accountIndex );
  }

  private request_latestMails( accountIndex: number ): Observable<any> {
    return new Observable( observer => {
      this.accountHttp.get_headers( accountIndex )
      .subscribe( httpOptions => {
        this.http.get( `https://esi.evetech.net/latest/characters/${accountIndex}/mail?datasource=tranquility`, httpOptions )
        .subscribe( mailInfo => {
          observer.next( mailInfo );
          observer.complete();
        });
      }); // end subscribe
    }); // end obeservable
  }

  private request_moreMails( accountIndex: number ): Observable<any> {
    return new Observable( observer => {
      // // TODO: should this be defined here or in get_moreMails and passed as parameter?
      const lastLoadedMail: LastLoadedMail = this.get_lastLoadedMail( accountIndex );
      this.accountHttp.get_headers( accountIndex )
      .subscribe( httpOptions => {
        this.http.get( `https://esi.evetech.net/latest/characters/${accountIndex}/mail?datasource=tranquility&last_mail_id=${lastLoadedMail.lastLoadedMail}`, httpOptions )
        .subscribe( mailInfo => {
          observer.next( mailInfo );
          observer.complete();
        });
      }); // end subscribe
    }); // end observable
  }

  private isRegisteredMail( mailIndex: number ): boolean {
    return this.mails.some( mail => {
      return mail.index === mailIndex;
    });
  }

  private add_mail( mail: Mail ): void {
    // check if the mail is added ( possible due to request delay )
    if( this.isRegisteredMail( mail.index ) === false ){
      this.mails.push( mail );
    }
    /*
    this.mails$.next( this.mails) is performed in functions invoking add_mail
    in order to prevent unnecessary reloading for each individual added mail
    */
  }

  private isCompletelyRegisteredMail( mailIndex: number ): boolean {
    return this.mails.some( mail => {
      return mail.index === mailIndex
        && mail.body !== null;
    });
  }

  /* LAST LOADED MAIL INFO */

  private register_lastLoadedMail( accountIndex: number, mailIndex: number, allMailsAreLoaded: boolean ): void {
    // TODO: not usre it may be better to split update and adding functionality
    if( this.isRegisteredLoadedMail( accountIndex ) === true ) {
      let lastLoadedMail = this.get_lastLoadedMail( accountIndex );
      lastLoadedMail.lastLoadedMail = mailIndex;
      lastLoadedMail.allMailsAreLoaded$.next( allMailsAreLoaded );
    } else {
      let lastLoadedMail = {
        accountIndex: accountIndex,
        lastLoadedMail: mailIndex,
        allMailsAreLoaded$: new BehaviorSubject( allMailsAreLoaded )
      }
      this.lastLoadedMails.push( lastLoadedMail );
    }
  }

  private isRegisteredLoadedMail( accountIndex ): boolean {
    return this.lastLoadedMails.some( lastLoadedMail => {
      return lastLoadedMail.accountIndex === accountIndex;
    });
  }

  public get_lastLoadedMail( accountIndex ): LastLoadedMail {
    if( this.isRegisteredLoadedMail( accountIndex ) ){
      const lastLoadedMail = this.find_lastLoadedMail( accountIndex );
      return lastLoadedMail;
    } else {
      this.register_lastLoadedMail( accountIndex, null, null );
      const lastLoadedMail = this.find_lastLoadedMail( accountIndex );
      return lastLoadedMail;
    }
  }

  private find_lastLoadedMail( accountIndex ): LastLoadedMail {
    return this.lastLoadedMails.find( lastLoadedMail => {
      return lastLoadedMail.accountIndex === accountIndex;
    });
  }

  /* MARK AS READ */

  public update_mailAsRead( mail: Mail ): void {
    this.accountHttp.get_headers( mail.account )
    .subscribe( httpOptions => {
      let mailIsread = {read: true};
      this.http.put( `https://esi.evetech.net/dev/characters/${mail.account}/mail/${mail.index}/?datasource=tranquility`, mailIsread, httpOptions )
      .subscribe( success => {
          mail.isRead = true;
          this.mailCounter.decrease_mailCounter( mail.account );
      });
    });
  }

  /* REMOVE MAIL */

  public remove_mail( mail: Mail ): Observable<boolean> {
    return new Observable( observer => {
      this.accountHttp.get_headers( mail.account )
      .subscribe( httpOptions => {
        this.http.delete( `https://esi.evetech.net/dev/characters/${mail.account}/mail/${mail.index}/?datasource=tranquility`, httpOptions )
        .subscribe(
          succes => {
            let newMails: Mail[] = this.mails.filter( oldMail => {
              return oldMail.index !== mail.index;
            });
            this.mails = newMails;
            this.mails$.next( this.mails );
            observer.next( true );
          },
          error => {
            observer.next( false ); //// TODO: does this work test it how????
          });
      }); // TODO: observer.next if get_headers fails ( need get_headers to throw an error )
    }); // end observable
  };
}
// TODO: Should I create a seperate service that modifies mails? That would create great interdepency between this class and the new class.
