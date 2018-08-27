import { Injectable } from '@angular/core';

import { UserTokens } from './UserTokens';

@Injectable({
  providedIn: 'root'
})
export class UserTokenMethodsService {

  constructor() { }

  public get_accessToken( userTokens: UserTokens ){
    // check if is expired

    if( this.isExpired( userTokens ) === true){
      // request etc.
    }else{ // isExpired === false
      return userTokens.accessToken;
    }
  }
  private isExpired( userTokens: UserTokens ): boolean{
    // return ( userTokens.expired > Date.now() ) ? true : false;
    // TEMP:
    return true;
  }
}
