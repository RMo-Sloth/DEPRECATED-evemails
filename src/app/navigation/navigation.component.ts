import { Component, OnInit, Input } from '@angular/core';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() buttons;

  constructor(
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
  }
  unset_currentAccount(){
    this.appStateService.unset_currentAccount();
  }
}
