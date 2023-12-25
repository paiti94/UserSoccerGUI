import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Observable } from 'rxjs';
import { Player } from 'src/app/state/player';
import { PlayerDetails } from 'src/app/state/player-details';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  videos: any[] = [];
  enteredPlayerName: string ='';
  constructor(private httpService: HttpService, private youtubeService: YoutubeService) { }

  selectedPlayer: Player = new Player();
  selectedPlayerDetails: PlayerDetails[] = [];
  videoIds: string[] = [];
  selected: boolean = false;
  ngOnInit(): void {
    this.selectedPlayer = new Player();
    this.youtubeService.getLatestSoccerVideos().subscribe(data => {
      this.videos = data.items;
    });
  }

  submitPlayerName() {
    this.selected = true;
    this.selectedPlayer = new Player();
    this.enteredPlayerName = this.enteredPlayerName.trim();
    this.httpService.getPlayer(encodeURIComponent(this.enteredPlayerName)).subscribe(player => {
      this.selectedPlayer = player;
    });
    this.httpService.getPlayerDetails(encodeURIComponent(this.enteredPlayerName)).subscribe(response => {
      //this.selectedPlayerDetails.push(new PlayerDetails(playerDetails));
       this.videoIds = response.map((item) => item.video);
    });

  }


}
