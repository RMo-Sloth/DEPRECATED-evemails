import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  accounts: any[] = []; // TODO: more strict typecheck

  constructor() { }


  public add_account(
    characterIndex: number,
    refreshToken: string,
    accessToken: string
  ): void{
    // check if account already exists
    const accountExists = this.accountExists( characterIndex );
    if( accountExists=== true ){
      // TODO: maybe update instead???
    }else{ // if accountExists === false
      let account = {
        characterIndex: characterIndex,
        refreshToken: refreshToken,
        accessToken: accessToken
      };
      this.accounts.push( account ); // TODO: typecheck
    }
  }
  public remove_account( characterIndex: number ): void{

  }

  private get_account( characterIndex: number ){

  }
  private accountExists( characterIndex: number ): boolean{
    );
    const index = this.accounts.findIndex( account => {
      return account.characterIndex === characterIndex;
    });
    // return true if the account is found ( when index doesn't equal -1)
    return ( index !== -1 );
  }

  private get_refreshToken( characterIndex: number ): string{
    // TEMP:
    return 'refreshToken';
  }
  private update_refreshToken( characterIndex: number ): void{

  }

  public get_accessToken( characterIndex: number ): string{
    // TEMP:
    return 'accessToken';
  }
  private update_accessToken( characterIndex: number ): void{

  }

  public refresh_tokens( characterIndex: number ): void{
    // TODO: recursive function with a timeOut based on the experationTime??
  }

}
