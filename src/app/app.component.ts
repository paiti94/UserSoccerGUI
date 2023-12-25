import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UserSoccer_GUI';
  constructor(private router: Router){};

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
