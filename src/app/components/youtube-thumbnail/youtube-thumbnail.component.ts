import { Component, Input, OnInit } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-youtube-thumbnail',
  templateUrl: './youtube-thumbnail.component.html',
  styleUrls: ['./youtube-thumbnail.component.scss']
})
export class YoutubeThumbnailComponent implements OnInit {

   @Input() videoUrl: string = '';
   @Input() latestNews: boolean = true;
   @Input() latestNewurl: string = '';
   thumbnailUrl: string = '';
   youtubeUrl: string = '';

   constructor(private youtubeService: YoutubeService) {}

   ngOnInit(): void {
    if(!this.latestNews){
      const videoId =  this.extractVideoId(this.videoUrl);
      if (videoId) {
        this.youtubeService.getVideoDetails(videoId).subscribe((response) => {
          if (response.items && response.items.length > 0) {
            this.thumbnailUrl = response.items[0].snippet.thumbnails.maxres.url;
            this.youtubeUrl = this.videoUrl;
          }
        });
      }
    }else{
      this.thumbnailUrl = this.videoUrl;
      this.youtubeUrl = "https://www.youtube.com/watch?v="+ this.latestNewurl;
      console.log("this is url to deisply "+this.youtubeUrl)
    }
   

   }

   private extractVideoId(url: string): string | null {
     console.log(this.videoUrl);
     const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
     return match ? match[1] : null;
   }

  
}
