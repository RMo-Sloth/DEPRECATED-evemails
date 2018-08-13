import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  accessToken: string;
  refreshToken: string;
  tokenExpirationTime: Date;
  
  constructor() { }
}
