import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchComponent } from './components/match/match.component';
import { MyteamComponent } from './components/myteam/myteam.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
 {path: 'main', component: MainComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'match', component: MatchComponent},
  {path: 'myteam', component: MyteamComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
