import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as newsitemsJson from "./newsitems.json";

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

  constructor(
    private http: HttpClient
  ) {
    // set animation speed in px/s
    this.speed = 30;
    this.newsitems = [];

  }

  ngOnInit() {
    newsitemsJson.forEach(newsitemDetails => {
      if(
        new Date( newsitemDetails.start ) <= Date.now() === true &&
        new Date( newsitemDetails.end ) > Date.now() === true
      ){
        this.newsitems.push( newsitemDetails.message );
      }
    });
    this.nextNewsitem();
    // start animating newsfeed after 1 second
    timer( 1000 )
    .subscribe( () => {
      this.animate();
    });
  }

  public animate(){
    // get containers width
    let newsfeedContainer = document.getElementById('newsfeed-container');
    this.newsfeedContainerWidth = newsfeedContainer.offsetWidth;
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
