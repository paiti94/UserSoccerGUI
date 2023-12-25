import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const gapi: any; // Declare gapi to avoid TypeScript errors

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyAhFFbfs9k7deCHW_uR_XvWwTTx38Nsjq0';
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) {
    gapi.load('client', this.initClient.bind(this));
  }

  private initClient() {
    gapi.client.init({
      apiKey: this.apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    });
  }

   getVideoDetails(videoId: string): Observable<any> {
      const params = {
        part: 'snippet',
        id: videoId,
        key: this.apiKey,
      };

      return this.http.get(this.apiUrl, { params });
    }

    getLatestSoccerVideos(): Observable<any> {
      const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
      const params = {
        part: 'snippet',
        type: 'video',
        q: 'Latest soccer news 2023 | Messi updates | Highlights and analysis',
        maxResults: '3', // Adjust the number of results as needed
        key: this.apiKey,
        videoEmbeddable: true,
       // videoCategoryId: '17' ,
        order: 'date'
      };
  
      return this.http.get(apiUrl, { params });
    }
  

}
