export class Player {
    playerseqno: string = '';
    p_name: string= '';
    birth: Date = new Date();
    height: number = 0;
    weight: number = 0;
    team: string = '';
    position: string = '';
    backnumber: number = 0;
    foot: string = '';
    emblem: string = '';
    emblemlink: string = '';

    constructor();

   constructor(player: Partial<Player>);

     // Implementation of the constructor based on the provided arguments
   constructor(player?: Partial<Player>) {
       if (player) {
         Object.assign(this, player);
       }
    }
}
