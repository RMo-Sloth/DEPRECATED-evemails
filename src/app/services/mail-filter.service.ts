import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// interfaces
import { Mail } from '../interfaces/mail';

// services
import { MailService } from './mail.service';

@Injectable({
  providedIn: 'root'
})
export class MailFilterService {

  private filteredMails$: BehaviorSubject<Mail[]>;
  // filter properties
  accountIndex: number;
  labels: number[];
  mailboxState: string;

  constructor(
    private mailService: MailService
  ) {
    this.filteredMails$ = new BehaviorSubject([]);
    this.mailboxState = 'inbox';
    this.labels = [];
    mailService.mails$
    .subscribe( mails => {
      this.filter( mails );
    });
  }
  private set_filterAccountIndex( accountIndex: number ): void {
    this.accountIndex = accountIndex;
  }

  private set_filterLabels( labels: number[] ): void {
    this.labels = labels;
  }

  private filter( mails: Mail[] ): void{
    let filteredMails = mails.filter( mail => {
      return mail.account === this.accountIndex
      && this.labelsFilter( mail.labels )
      && this.mailboxStateFilter( mail.labels );
    });
    this.filteredMails$.next( filteredMails );
  }

  private labelsFilter( labels: number[] ): boolean {
    // checks if the labels have at least one matching label with this.labels
    if( this.labels.length === 0 ){
      return true;
    }
    for( let i = 0; i < this.labels.length; i++ ){
      if( this.labels.includes( this.labels[i] ) === true ){
        return true;
      }
    }
    return false;
  }

  private mailboxStateFilter( labels: number[] ): boolean {
    switch( this.mailboxState ){
      case 'inbox':
        return labels.includes(1) );
      case 'outbox':
        // assuming all outbox mails are not inbox
        return !labels.includes(1);
    }
  }

}

// trigger update when mail-array changes OR when a new filter is applied
