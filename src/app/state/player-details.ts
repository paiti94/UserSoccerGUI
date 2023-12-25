export class PlayerDetails {
 playerseqno: string = '';
 article: string = '';
 picture: string = '';
 name: string = '';
 video: string = '';
 highlight: string = '';
 article_name: string = '';

 constructor();
 constructor(playerDetails: Partial<PlayerDetails>);
 constructor(playerDetails?: Partial<PlayerDetails>) {
        if (playerDetails) {
          Object.assign(this, playerDetails);
        }
     }
}
