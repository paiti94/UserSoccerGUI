import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportsAPIService {
  private apiUrl = 'https://www.thesportsdb.com/api/v1/json/3';

  constructor(private http: HttpClient) {
  }

  getPlayerDetails(name : string):Observable<any>{
    return this.http.get(`${this.apiUrl}/searchplayers.php?p=${name}`);
  }

  getMatchesforTeam(teamId: string):Observable<any>{
    console.log(`${this.apiUrl}/eventslast.php?id=${teamId}`);
    return this.http.get(`${this.apiUrl}/eventslast.php?id=${teamId}`);
  }
}
