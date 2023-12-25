import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { MatchPlayer } from 'src/app/state/match-player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
[x: string]: any;
 
  playerList: MatchPlayer[] = [];
  items: MatchPlayer[] =[];
  constructor(private httpService: HttpService) { }
  itemsPerPage = 15;
  maxSize = 5;  // Optional: maximum number of page links to display
  currentPage = 1;


  ngOnInit(): void {
    this.httpService.getPlayerAll().subscribe(player => {
      this.playerList = player;
      this.items = player;
    });
    
    // this.httpService.getPlayerDetails(encodeURIComponent(this.enteredPlayerName)).subscribe(response => {

    //    this.videoIds = response.map((item) => item.video);
    // });
  }


  pageChanged(event: number): void {
    console.log('Page changed to: ' + event);
    this.currentPage = event; // Update the current page
    this.loadData(event);
   
  }

  loadData(page:number): void {
    this.httpService.getPlayerAllPage(page, this.itemsPerPage).subscribe(players => {
      this.items = players;
      console.log(this.items);
    });
  }
 
}
  

