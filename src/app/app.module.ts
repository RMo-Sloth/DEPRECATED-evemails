import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { ReceivedMailsComponent } from './received-mails/received-mails.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreensaverComponent,
    ReceivedMailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
