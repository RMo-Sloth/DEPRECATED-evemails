// TODO: UNTESTED!!!!

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mail } from '../interfaces/mail';



@Injectable({
  providedIn: 'root'
})
export class MailService {
  private mails: Mail[];

  constructor(
    private http: HttpClient,
  ) {
    this.mails = [];
  }

  public get_mail( index: number, account: number ): Observable<Mail> {
    return new Observable( observer => {
      switch( true ){
        case this.isCompletelyRegisteredMail( index ):
          // return mail
          let mail = this.mails.find( mail => {
            return mail.index === index;
          });
          observer.next( mail );
          observer.complete();
          break;
        case this.isRegisteredMail( index ) :
          // update the existing mail to have a body
          this.append_body( index )
          .subscribe( mailInfo => {
            let mail = ;
            observer.next( mail );
            observer.complete();
          });
          break;
        default:
          // add a new mail to the mails[]
          // return the new mail
      }
    }); // end observable
  }
  public get_mails( account: number ){
    // retreives a list of mails

  }
  private request_mail( index: number, account: number ): Observable<HttpEvent<any>>{ // TODO: any should be more precise
      // TODO: should I go through the http or go through a httpAccountService???
      return this.http.get(``);
      // TODO: should teh subscribe part be here?? Or should I just return the request ( SRP )
      // .subscribe( mailInfo => {
      //   const mail: Mail = {
      //     index: index,
      //     account: account,
      //     labels: ,
      //     sender: ,
      //     recipients: ,
      //     subject: ,
      //     body: ,
      //     timestamp: ,
      //     isRead:
      //   }
  }
  private add_mail( mail: Mail ){
    // check if the mail is added ( possible due to request delay )
    if( this.isRegisteredMail( index ) === false ){
      this.mails.push( mail );
    }
  }
  private append_body( mail ): void { // TODO: should this method exist at all??? WOn't mail.body = body after a request be easier???
    return new Observable( observer => {
      let details: Observable<any> = this.http.get(``)
      .subscribe( mailInfo => {
        let mail = this.mails.find( mail => {
          return mail.index === index;
        });
        mail.body = mailInfo.body;
        observer.next( mail );
        observer.complete();
      });
    });
  }
  private isRegisteredMail( index: number ): boolean{
    return this.mails.some( mail => {
      return mail.index === index;
    });
  }
  private isCompletelyRegisteredMail( mail: number ){
    return this.mails.some( mail => {
      return mail.index === index
        && mail.body !== undefined;
    });
  }
}
