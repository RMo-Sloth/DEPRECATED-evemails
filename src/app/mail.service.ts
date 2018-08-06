import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Mail } from './mail';
import { Mails } from './mock-mails';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  getMails(): Observable<Mail[]> {
    return of(Mails);
  }
}
