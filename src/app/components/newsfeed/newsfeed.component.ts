import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  public newsitem: string;
  private newsitems: string[];

  constructor() {

    this.newsitem = 'Placeholder s,dngkjfdshgkj hfdkjgh kjsdfgh kj dhfsgk jhdfskj ghkjdfls gkljrs fgkljfkld <a href="http://www.google.com" target="_blank">www.google.com</a> gjldfks';
  }

  ngOnInit() {
    window.setTimeout( function(){

      
      // get containers width
      let newsfeedContainer = document.getElementById('newsfeed-container');
      let newsfeedContainerWidth = newsfeedContainer.offsetWidth;

      // get newsItem's width
      let newsItem = document.getElementById('newsitem');
      let newsItemWidth = newsItem.offsetWidth;

      // set animation speed in px/s
      let speed = 30;

      // animation duration in ms
      let duration = ( newsfeedContainerWidth + newsItemWidth ) / speed * 1000;

      let start;
      function animationStep( timestamp ) {
        if (!start) start = timestamp;
        var progress = ( timestamp - start ) / duration;
        newsItem.style.left =  newsfeedContainerWidth + progress * ( -newsItemWidth + -newsfeedContainerWidth ) + 'px';
        if (progress < 1) {
          window.requestAnimationFrame( animationStep );
        }else{
          newsItem.style.left = newsfeedContainerWidth + 'px';
          window.setTimeout( function(){
            start = null;
            window.requestAnimationFrame( animationStep );
          }, 1000);
        }
      }
      start = null;
      window.requestAnimationFrame( animationStep );

    }, 1000 );



  }

}
