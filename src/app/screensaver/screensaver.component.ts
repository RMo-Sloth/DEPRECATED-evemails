import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css'],
  animations: [
    trigger('animateOverlay', [
      state('inactive', style({
        height: '100vh'
      })),
      state('active',   style({
        height: '12vh'
      })),
      transition('inactive => active', animate('800ms linear')),
      transition('active => inactive', animate('800ms linear'))
    ]),
    trigger('animateLine', [
      state('inactive', style({
        // width: '100vh'
      })),
      state('active',   style({
        // width: '12vh'
      })),
      transition('inactive => active', animate('800ms 880ms linear')),
      transition('active => inactive', animate('800ms 880ms linear'))
    ])
  ]
})
export class ScreensaverComponent implements OnInit {

  constructor(
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
  }

}
