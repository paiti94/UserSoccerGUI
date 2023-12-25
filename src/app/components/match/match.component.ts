import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { MatchPlayer } from 'src/app/state/match-player';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { SportsAPIService } from 'src/app/service/sports-api.service';
import { ApiPlayerDetails } from 'src/app/state/api-player-details';
import { ApiMatch } from 'src/app/state/api-match';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  playerDetails:  ApiPlayerDetails = new ApiPlayerDetails();
  matchforTeam: ApiMatch[] = [];
  selRound: string = '';
  matchPlayerList: MatchPlayer[] =[];
  currentPair: MatchPlayer[] =[];
  selectedIndex: number | null = null; // Keep track of the selected image index
  selectedPlayer: MatchPlayer[] =[];
  moveToNext:boolean = false;
  final: MatchPlayer = new MatchPlayer();
  round: number = 1;
  constructor(private http: HttpService, private cdr: ChangeDetectorRef, private zone: NgZone, private sportsapiService: SportsAPIService) { }

  ngOnInit(): void {
  }

  match(round: string){
    this.round =1;
    this.moveToNext = false;
    this.selectedPlayer = [];
    this.matchPlayerList = [];
    this.currentPair = [];
    this.final = new MatchPlayer();
    this.http.getMatch(Number(round)).subscribe(response => {
      for(let r of response){
        this.matchPlayerList.push(new MatchPlayer(r.id, r.name, r.position, r.dateOfBirth, r.nationality, r.team, r.teamId));
      }
      for(let player of this.matchPlayerList){
        this.sportsapiService.getPlayerDetails(player.name).subscribe(detail => {
          if(detail.player){
              player.id_sportsDB = detail.player[0].idPlayer;
              player.strAgent = detail.player[0].strAgent;
              player.strDescriptionEN = detail.player[0].strDescriptionEN;
              player.strFacebook = detail.player[0].strFacebook;
              player.strTwitter = detail.player[0].strTwitter;
              player.strInstagram = detail.player[0].strInstagram;
              player.strYoutube = detail.player[0].strYoutube;
              player.strHeight = detail.player[0].strHeight;
              player.strWeight = detail.player[0].strWeight;
              player.strThumb = detail.player[0].strThumb;
              player.strCutout = detail.player[0].strCutout;
              player.strRender = detail.player[0].strRender;
              console.log(JSON.stringify(player))
          }
        })
      }
      this.getNextPair();
    })
  }


  getNextPair() {
     //this.matchPlayerList = this.shuffleArray(this.matchPlayerList);
     if(this.matchPlayerList.length>2){
      this.currentPair = this.shuffleArray(this.matchPlayerList).splice(0,2);
     }else {
      if(this.round == Math.log2(Number(this.selRound))){
        // this.currentPair = this.selectedPlayer.slice();
        this.currentPair = [...this.matchPlayerList]
      }else{
        this.currentPair = [...this.matchPlayerList];
        this.matchPlayerList = [...this.selectedPlayer];
        this.moveToNext = true;
      }
     }
    }

  private shuffleArray(array: any[]): any[] {
    // Implement a simple shuffle algorithm (Fisher-Yates)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
    if(this.round == Math.log2(Number(this.selRound))){
       this.final = this.currentPair[index];
       this.getFinalPlayerDetails(this.final.name);
       this.getMatchesforTeam(this.playerDetails.idTeam);
     }else{
        this.selectedPlayer.push(this.currentPair[index]);
      
      if(this.moveToNext){
        this.round++;
        this.matchPlayerList = [...this.selectedPlayer];
        this.moveToNext = false;
        this.selectedPlayer = [];
      } 
         this.getNextPair();
    }
  } 

  getFinalPlayerDetails(name: string){
   this.sportsapiService.getPlayerDetails(name).subscribe(response =>{
      response.player.forEach((element: any) => {
       // element.map((item: { idPlayer: string | undefined; })=>this.playerDetails = new ApiPlayerDetails(item.idPlayer, ));
        this.playerDetails =new ApiPlayerDetails(element.idPlayer, element.idTeam, element.idTeam2, element.idTeamNational, element.idSoccerXML,
          element.idAPIfootball, element.idPlayerManager, element.strNationality, element.strPlayer,
          element.strTeam, element.strTeam2, new Date(element.dateBorn), element.strNumber, element.strSigning, element.strDescriptionEN);
          console.log("this is id", this.playerDetails.idTeam);
      });
   })
  }

  getMatchesforTeam(teamId: string){
    this.sportsapiService.getMatchesforTeam(teamId).subscribe(response =>{
      response.events.forEach((element: any) =>{
         this.matchforTeam.push(new ApiMatch(element.idEvent,element.strEvent, new Date(element.dateEvent), element.strTime, element.strThumb, element.strBanner, element.strVideo, element.strStatus, element.strResult ));
      })
    })
  }

  openExternalLink(url: string): void {
    console.log(url);
    if(url.startsWith("https:") || url.startsWith("Https:")){
      window.open(url, '_blank');
    }else{
      window.open("https://"+url, '_black');
    }
    
}
}
