import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css']
})
export class ScreensaverComponent implements OnInit {

  constructor(
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
  }

}
