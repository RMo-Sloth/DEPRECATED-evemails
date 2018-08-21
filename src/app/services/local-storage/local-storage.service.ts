import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get_refreshToken( characterIndex ){

  }
  public add_account(){

  }
  public remove_account(){

  }
  public update_account(){

  }
  public get_accounts(){
    const accounts = localStorage.getItem('accounts');
    if( accounts === undefined ){
      return [];
    }else{
      return JSON.parse( accounts );
    }
  }
}
