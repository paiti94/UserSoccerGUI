import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../state/player';
import { PlayerDetails } from '../state/player-details';
import { MatchPlayer } from '../state/match-player';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:9603/api';

  constructor(private httpClient: HttpClient) { }

  getPlayer(name: string): Observable<Player>{
    return this.httpClient.get<Player>(`${this.baseUrl}/player/${name}`);
   }
   getPlayerAll(): Observable<MatchPlayer[]>{
    return this.httpClient.get<MatchPlayer[]>(`${this.baseUrl}/athleteall`);
   }
  getPlayerDetails(name: string): Observable<PlayerDetails[]> {
    return this.httpClient.get<PlayerDetails[]>(`${this.baseUrl}/info/${name}`);
  }
  getMatch(round: number): Observable<MatchPlayer[]>{
    return this.httpClient.get<MatchPlayer[]>(`${this.baseUrl}/athlete/match/${round}`);
  }
  getPlayerAllPage(page: number, itemsPerPage: number): Observable<MatchPlayer[]> {
    // Adjust the API endpoint and parameters based on your API
    const apiUrl = `${this.baseUrl}/athleteallbypage?page=${page}&itemsPerPage=${itemsPerPage}`;
    return this.httpClient.get<MatchPlayer[]>(apiUrl);
  }

}
