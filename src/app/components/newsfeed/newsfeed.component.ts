import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {

  public newsitem: string;
  private newsitems: string[];
  private speed;
  private duration;
  private newsfeedContainerWidth;
  private newsItem;
  private newsItemWidth;
  public transition: string;
  public left: string;

  constructor() {
    // set animation speed in px/s
    this.speed = 30;

    this.newsitems = ["Special thanks to Eddie Jaoude for pointing me in the right direction while developing this website in angular. <a href='https://www.youtube.com/eddiejaoude' target='_blank'>Check out Eddie Jaoude's youtube channel!</a>", 'Special thanks to Magmarabbit for providing images and the "eve-mails" logo. <a href="https://www.twitch.tv/magmarabbit" target="_blank">Follow Magmarabbit on twitch!</a>'];
  }

  ngOnInit() {
    // get containers width
    let newsfeedContainer = document.getElementById('newsfeed-container');
    this.newsfeedContainerWidth = newsfeedContainer.offsetWidth;
    // start animating newsfeed
    this.animate();
  }

  public animate(){
    // get newsItem's width
    this.newsItem = document.getElementById('newsitem');
    this.newsItemWidth = this.newsItem.offsetWidth;
    // set new animation duration in s
    this.duration = parseFloat( ( this.newsfeedContainerWidth + this.newsItemWidth ) / this.speed ).toFixed(2);
    // set new transition
    this.transition = `left ${this.duration}s linear`;

    // change the left value after 0.5s to prevent batch updating of js
    timer( 500 )
    .subscribe( () => {
      this.left = `-${this.newsItemWidth}px`;
    });
    // reset to initial values after the transition is completed
    timer( 500 + this.duration * 1000 )
    .subscribe( () => {
      this.transition = '';
      this.left = `${this.newsfeedContainerWidth}px`;
      this.nextNewsitem();
    });
    // after 1 seconds recurse this function
    timer( 1000 + this.duration * 1000 )
    .subscribe( () => {
      this.animate();
    })
  }
  private nextNewsitem(){
    let newNewsitem = this.newsitems.shift();
    this.newsitem = newNewsitem;
    this.newsitems.push( newNewsitem );
  }

}
