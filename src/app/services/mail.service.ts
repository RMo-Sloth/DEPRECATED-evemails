import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mail } from '../interfaces/mail';



@Injectable({
  providedIn: 'root'
})
export class MailService {
  private mails: Mail[];
  
  constructor() { }
}
