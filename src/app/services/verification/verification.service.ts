import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor() { }

  accounts: []; // TODO: stricter typecheck

  public add_account(
    characterIndex: number,
    refreshToken: string,
    accessToken: string ): void{

  }
  public remove_account( characterIndex: number ): void{

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
